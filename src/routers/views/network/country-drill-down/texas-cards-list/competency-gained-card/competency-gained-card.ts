import {Component, Vue, Prop} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import CompetencyGainedPullup from './competency-gained-pullup/competency-gained-pullup';
import axios from 'axios';
import { perfomanceAPI } from '@/providers/apis/performance/performance';
import { getSum } from '@/utils/utils';
import moment from 'moment';

@Component({
    name: 'competency-gained-card',
    components: {
        'material-icon': GoogleMaterialIcon,
        'competency-gained-pullup': CompetencyGainedPullup,
    },
})

export default class CompentencyGainedCard extends Vue {

    // ------------------------------------------------------------
    // Properties
    @Prop()
    private averagePerformance: any;
    @Prop()
    private countryData: any;
    @Prop()
    private selectedDate?: string;
    @Prop()
    private subjectsList?: any;
    @Prop()
    private competencyData: any;
    @Prop()
    private performanceData: any;

    private selectedSubject: any;

    private dataList: any = {};

    private selectedLevel: any;

    private get dataParams() {
        return {
            month: this.selectedDate ? moment(this.selectedDate).format('MM') :  moment().format('MM'),
            year: this.selectedDate ? moment(this.selectedDate).format('YYYY') :  moment().format('YYYY'),
            subject: this.selectedSubject.subject,
            framework: this.selectedSubject.framework,
        };
    }

    private params: any = {};

    private isShowCompetency: boolean = false;

    private districtList: any  = [];

    get totalCompetencyGained() {
        const competencyGained = this.competencyData.data ? this.competencyData.data : this.competencyData;
        return getSum(competencyGained, 'completedCompetencies');
    }
    // ------------------------------------------------------------
    // Actions

    private onGoBack(show: boolean = false) {
        this.isShowCompetency = show;
    }

    private onSelectLevel(level: any) {
        this.selectedLevel = level ? level : this.countryData;
        this.loadPerformanceData();
    }

    // ---------------------------------------------------------------
    // Hooks

    private created() {
        this.selectedSubject = this.subjectsList.length ? this.subjectsList[0] : {
            subject: 'K12.MA',
            framework: 'SBCG',
        };
        this.selectedLevel = this.countryData;
        this.loadPerformanceData();
    }

    // ----------------------------------------------------------------
    // Methods

    private selectLevelService(seletectLevel: any) {
        let serviceLevel = Promise.resolve([]);
        switch (seletectLevel.type) {
            case 'country':
                this.params.country_id = seletectLevel.id;
                serviceLevel = perfomanceAPI.fetchStateByCountryID('performance', this.params, this.dataParams);
                break;
            case 'state':
                this.params.state_id = seletectLevel.id;
                serviceLevel = perfomanceAPI.fetchDistrictByStateID('performance', this.params, this.dataParams);
                break;
            case 'system':
                this.params.group_id = seletectLevel.id;
                serviceLevel = perfomanceAPI.fetchSchoolByDistrictID('performance', this.params, this.dataParams);
                break;
            case 'school':
                this.params.school_id = seletectLevel.id;
                serviceLevel = perfomanceAPI.fetchClassBySchoolID('performance', this.params, this.dataParams);
                break;
            default:
                const params = {
                    classId: seletectLevel.id,
                    courseId: seletectLevel.course_id,
                    subjectCode: 'K12.MA',
                    month: this.dataParams.month,
                    year: this.dataParams.year,
                };
                serviceLevel = perfomanceAPI.fetchStudentsByClassID(params);
                break;

        }
        return serviceLevel;
    }


    private loadPerformanceData() {
       this.selectLevelService(this.selectedLevel)
        .then((levelData) => {
            this.dataList = levelData;
        });
    }


}

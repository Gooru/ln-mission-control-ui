import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
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

    private get performanceParams() {
        return {
            month: this.selectedDate ? moment(this.selectedDate).format('MM') :  moment().format('MM'),
            year: this.selectedDate ? moment(this.selectedDate).format('YYYY') :  moment().format('YYYY'),
            frequency: 'monthly',
            subject: this.selectedSubject.subject,
            framework: this.selectedSubject.framework,
        };
    }

    private get competencyParams() {
        return {
            month: this.selectedDate ? moment(this.selectedDate).format('MM') :  moment().format('MM'),
            year: this.selectedDate ? moment(this.selectedDate).format('YYYY') :  moment().format('YYYY'),
            frequency: 'monthly',
        };
    }

    // ------------------------------------------------------------
    // Properties
    @Prop()
    private countryData: any;
    @Prop()
    private selectedDate?: string;
    @Prop()
    private subjectsList: any;
    @Prop()
    private score: any;

    private get totalCompetency() {
        return this.score.totalCompetencies ? this.score.totalCompetencies : 0;
    }

    private get totalPerformances() {
        return this.score.averagePerformance ? Math.round(this.score.averagePerformance) : 0;
    }

    private competencyData: any = {};

    private performanceData: any = {};

    private selectedSubject: any;

    private dataList: any = {};

    private selectedLevel: any;

    private params: any = {};

    private isShowCompetency: boolean = false;

    private districtList: any  = [];

    private totalCompetencyGained: number = 0;

    private totalPerformance: number = 0;

    // ------------------------------------------------------------
    // Actions

    private onGoBack(show: boolean = false) {
        this.isShowCompetency = show;
    }

    private onSelectLevel(level: any) {
        this.selectedLevel = level ? level : this.countryData;
        this.loadPerformanceData(this.selectedLevel);
    }

    private onSelectSubject(subject: any) {
        this.selectedSubject = subject;
        this.performanceParams.subject = subject.subject,
        this.performanceParams.framework = subject.framework,
        this.loadPerformanceData(this.selectedLevel);
    }

    private toggleCompetencyData() {
        if (this.subjectsList.length) {
            this.isShowCompetency = !this.isShowCompetency;
            if (this.isShowCompetency) {
                this.initLoader();
            }
        }
    }

    // ---------------------------------------------------------------
    // Hooks

    // ----------------------------------------------------------------
    // Methods

    private selectLevelService(seletectLevel: any) {
        let serviceLevel: any = Promise.resolve([]);
        switch (seletectLevel.type) {
            case 'country':
                this.params.country_id = seletectLevel.id;
                serviceLevel = axios.all([
                    perfomanceAPI.fetchStatePerformanceByCountryID(this.params, this.performanceParams),
                    perfomanceAPI.fetchStateCompetencyByCountryID(this.params, this.competencyParams),
                ]);
                break;
            case 'state':
                this.params.state_id = seletectLevel.id;
                serviceLevel = axios.all([
                    perfomanceAPI.fetchDistrictPerformanceByStateID(this.params, this.performanceParams),
                    perfomanceAPI.fetchDistrictCompetencyByStateID(this.params, this.competencyParams),
                ]);
                break;
            case 'system':
                this.params.group_id = seletectLevel.id;
                serviceLevel = axios.all([
                    perfomanceAPI.fetchSchoolPerformanceByDistrictID(this.params, this.performanceParams),
                    perfomanceAPI.fetchSchoolCompetencyByDistrictID(this.params, this.competencyParams),
                ]);
                break;
            case 'school':
                this.params.school_id = seletectLevel.id;
                serviceLevel = axios.all([
                    perfomanceAPI.fetchClassPerformanceBySchoolID(this.params, this.performanceParams),
                    perfomanceAPI.fetchClassCompetencyBySchoolID(this.params, this.competencyParams),
                ]);
                break;
            default:
                break;

        }
        return serviceLevel;
    }


    private loadPerformanceData(selectlevel: any) {
       this.selectLevelService(selectlevel)
        .then(axios.spread((performance: any, competency: any) => {
            this.totalCompetencyGained = Math.abs(competency.overallStats.totalCompetencies) || 0;
            this.totalPerformance = Math.round(performance.overallStats.averagePerformance) || 0;
            this.performanceData = performance;
            this.competencyData = competency;
        }));
    }

    private initLoader() {
        this.selectedSubject = this.subjectsList.length ? this.subjectsList[0] : null;
        this.selectedSubject.isActive = true;
        this.selectedLevel = this.countryData;
        this.loadPerformanceData(this.selectedLevel);
    }


}

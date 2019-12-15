import { Component, Vue } from 'vue-property-decorator';
import TexasDistrictCard from './texas-district-card/texas-district-card';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import TexasChart from './texas-chart/texas-chart';
import TexasCardsList from './texas-cards-list/texas-cards-list';
import PerformanceByGrade from './performance-by-grade/performance-by-grade';
import { perfomanceAPI } from '@/providers/apis/performance/performance';
import axios from 'axios';
import MonthYearPicker from '@/components/selector/month-year-picker/month-year-picker';
import moment from 'moment';

@Component({
    name: 'country-drill-down',
    components: {
        'texas-chart': TexasChart,
        'texas-district-card': TexasDistrictCard,
        'material-icon': GoogleMaterialIcon,
        'texas-card-list': TexasCardsList,
        'texas-grade-list': PerformanceByGrade,
        'month-picker': MonthYearPicker,
    },
})

export default class CountryDrillDown extends Vue {

    // -------------------------------------------------------------
    // Properties

    private stateList: any = [];

    private performanceData: any = [];

    private competencyData: any = [];

    private countryId?: string;

    private countryData?: any;

    private paramsIds: any = {};

    private breadcrumb: any = [];

    private isLoaded: boolean = false;

    private seletedLevel: any;

    private selectedDate: string = '';

    private averagePerformance?: any;

    private subjectsList?: any;

    private dataParams: any = {
        month: moment().format('MM'),
        year: moment().format('YYYY'),
        frequency: 'monthly',
    };

    private hideProperty: boolean = false;

    // --------------------------------------------------------------
    // Hooks

    private created() {
        this.countryId = this.$route.params.id;
        this.countryData = {
            id: this.countryId,
            name: this.$route.params.name,
            type: 'country',
        };
        this.seletedLevel = this.countryData;
        this.getStateList();
    }

    // ---------------------------------------------------------------
    // Actions
    private onSelectLevel(seletectLevel: any) {
        this.selectedLevelData(seletectLevel);
    }

    private backButton() {
        this.$router.push('/network');
    }

    private onBack() {
        const removedLevel = this.breadcrumb.pop();
        this.fetchSelectLevelData(removedLevel);
    }

    private onChageTimeline(date: any) {
        this.selectedDate = date;
        this.dataParams.month = moment(date).format('MM');
        this.dataParams.year = moment(date).format('YYYY');
        this.getStateList();
    }

    // --------------------------------------------------------------
    // Methods
    private getStateList() {
        const params: any = this.paramsIds;
        params.country_id = this.countryId;
        axios.all([
            perfomanceAPI.fetchStateByCountryID('performance', params, this.dataParams),
            perfomanceAPI.fetchStateByCountryID('competency', params, this.dataParams),
            perfomanceAPI.fetchCountrySubject('performance', params, this.dataParams),
        ]).then(axios.spread((performance, competency, subjects) => {
            this.performanceData = performance;
            this.competencyData = competency;
            this.subjectsList = subjects;
            this.averagePerformance = Math.round(performance.overallStats.averagePerformance);
            this.isLoaded = true;
        }));

    }

    private selectLevelService(seletectLevel: any) {
        let serviceLevel = Promise.resolve([]);
        switch (seletectLevel.type) {
            case 'country':
                this.paramsIds.country_id = seletectLevel.id;
                serviceLevel = perfomanceAPI.fetchStateByCountryID('competency', this.paramsIds, this.dataParams);
                break;
            case 'state':
                this.paramsIds.state_id = seletectLevel.id;
                serviceLevel = perfomanceAPI.fetchDistrictByStateID('competency', this.paramsIds, this.dataParams);
                break;
            case 'system':
                this.paramsIds.group_id = seletectLevel.id;
                serviceLevel = perfomanceAPI.fetchSchoolByDistrictID('competency', this.paramsIds, this.dataParams);
                break;
            case 'school':
                this.paramsIds.school_id = seletectLevel.id;
                serviceLevel = perfomanceAPI.fetchClassBySchoolID('competency', this.paramsIds, this.dataParams);
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

    private fetchSelectLevelData(seletectLevel: any) {
        const selectedService = this.selectLevelService(seletectLevel);
        return selectedService.then((levelData: any) => {
            this.competencyData = levelData;
        });
    }

    private selectedLevelData(seletectLevel: any) {
        const isBreadcrumb = this.breadcrumb.indexOf(seletectLevel);
        if (isBreadcrumb !== -1) {
            this.breadcrumb = this.breadcrumb.slice(0, isBreadcrumb);
        } else {
            if (this.breadcrumb.length === 0) {
                this.breadcrumb.push(this.countryData);
            }
            this.breadcrumb.push(seletectLevel);
        }
        this.seletedLevel = seletectLevel;
        this.fetchSelectLevelData(seletectLevel);
    }

}

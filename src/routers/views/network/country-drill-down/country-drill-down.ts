import { Component, Vue } from 'vue-property-decorator';
import TexasDistrictCard from './texas-district-card/texas-district-card';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import TexasChart from './texas-chart/texas-chart';
import TexasCardsList from './texas-cards-list/texas-cards-list';
import PerformanceByGrade from './performance-by-grade/performance-by-grade';
import { perfomanceAPI } from '@/providers/apis/performance/performance';
import axios from 'axios';

@Component({
    name: 'country-drill-down',
    components: {
        'texas-chart': TexasChart,
        'texas-district-card': TexasDistrictCard,
        'material-icon': GoogleMaterialIcon,
        'texas-card-list': TexasCardsList,
        'texas-grade-list': PerformanceByGrade,
    },
})

export default class CountryDrillDown extends Vue {

    // -------------------------------------------------------------
    // Properties

    private stateList: any = [];

    private countryId?: string;

    private countryName?: string;

    private paramsIds: any = {};

    private breadcrumb: any = [];

    private isLoaded: boolean = false;

    // --------------------------------------------------------------
    // Hooks

    private created() {
        this.countryId = this.$route.params.id;
        this.countryName = this.$route.params.name;
        this.getStateList();
    }

    // ---------------------------------------------------------------
    // Actions
    private onSelectLevel(seletectLevel: any) {
        this.selectedLevelData(seletectLevel);
    }

    // --------------------------------------------------------------
    // Methods
    private getStateList() {
        const params: any = this.paramsIds;
        params.country_id = this.countryId;
        axios.all([
            perfomanceAPI.fetchStateByCountryID(params),
        ]).then(axios.spread((states) => {
            this.stateList = states;
            this.isLoaded = true;
        }));
    }

    private selectLevelService(seletectLevel: any) {
        let serviceLevel = Promise.resolve([]);
        switch (seletectLevel.type || seletectLevel.sub_type) {
            case 'country':
                this.paramsIds.country_id = seletectLevel.id;
                serviceLevel = perfomanceAPI.fetchStateByCountryID(this.paramsIds);
                break;
            case 'state':
                this.paramsIds.state_id = seletectLevel.id;
                serviceLevel = perfomanceAPI.fetchDistrictByStateID(this.paramsIds);
                break;
            case 'system':
                this.paramsIds.group_id = seletectLevel.id;
                serviceLevel = perfomanceAPI.fetchSchoolByDistrictID(this.paramsIds);
                break;
            case 'school':
                this.paramsIds.school_id = seletectLevel.id;
                serviceLevel = perfomanceAPI.fetchClassBySchoolID(this.paramsIds);
                break;
            default:
                break;

        }
        return serviceLevel;
    }

    private fetchSelectLevelData(seletectLevel: any) {
        const selectedService = this.selectLevelService(seletectLevel);
        selectedService.then((levelData) => {
            this.stateList = levelData;
        });
    }

    private selectedLevelData(seletectLevel: any) {
        const isBreadcrumb = this.breadcrumb.indexOf(seletectLevel);
        if (isBreadcrumb !== -1) {
            this.breadcrumb = this.breadcrumb.slice(0, isBreadcrumb);
        } else {
            if (this.breadcrumb.length === 0) {
                this.breadcrumb.push({
                    id: this.countryId,
                    name: this.countryName,
                    type: 'country',
                   });
            }
            this.breadcrumb.push(seletectLevel);
        }
        this.countryName = seletectLevel.name;
        this.fetchSelectLevelData(seletectLevel);
    }

}

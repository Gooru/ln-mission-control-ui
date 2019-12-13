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

    private paramsIds: any = {};

    private isLoaded: boolean = false;

    // --------------------------------------------------------------
    // Hooks

    private created() {
        this.countryId = this.$route.params.id;
        this.getStateList();
    }

    // ---------------------------------------------------------------
    // Actions
    private onSelectLevel(seletectLevel: any) {
        this.fetchSelectLevelData(seletectLevel);
    }

    // --------------------------------------------------------------
    // Methods
    private getStateList() {
        const params: any = this.paramsIds;
        params.country_id = this.countryId;
        perfomanceAPI.fetchStateByCountryID(params)
            .then((states) => {
                this.stateList = states;
                this.isLoaded = true;
            });
    }

    private selectLevelService(seletectLevel: any) {
        let serviceLevel = Promise.resolve([]);
        switch (seletectLevel.type) {
            case 'state':
                this.paramsIds.state_id = seletectLevel.id;
                serviceLevel = perfomanceAPI.fetchDistrictByStateID(this.paramsIds);
                break;
            case 'school':
                this.paramsIds.school_id = seletectLevel.id;
                serviceLevel = perfomanceAPI.fetchClassBySchoolID(this.paramsIds);
                break;
            default:
                serviceLevel = perfomanceAPI.fetchStateByCountryID(this.paramsIds);
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

}

import {Component, Vue} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import CompetencyGainedPullup from './competency-gained-pullup/competency-gained-pullup';
import axios from 'axios';
import { perfomanceAPI } from '@/providers/apis/performance/performance';

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

    private isShowCompetency: boolean = false;

    private districtList: any  = [];


    // ------------------------------------------------------------
    // Actions

    private onGoBack(show: boolean = false) {
        this.isShowCompetency = show;
    }

    // ---------------------------------------------------------------
    // Hooks

    private mounted() {
        this.loadStatesList();
    }

    // --------------------------------------------------------------
    // Methods

    private loadStatesList() {
        perfomanceAPI.fetchDistrictByStateID().then((districts) => {
            this.districtList = districts;
        });
    }



}

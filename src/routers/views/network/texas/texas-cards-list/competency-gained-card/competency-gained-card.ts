import {Component, Vue} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import CompetencyGainedPullup from './competency-gained-pullup/competency-gained-pullup';

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


    // ------------------------------------------------------------
    // Actions

    private onGoBack(show: boolean) {
        this.isShowCompetency = show;
    }
}

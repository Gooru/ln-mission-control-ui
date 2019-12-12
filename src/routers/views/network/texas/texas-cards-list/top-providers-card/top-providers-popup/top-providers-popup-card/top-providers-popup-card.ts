import {Component, Vue, Prop} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import FontAwesomeIcon from '@/components/icons/font-awesome-icon/font-awesome-icon';
import ProgressBar from '@/components/charts/progress-bar/progress-bar';
import ConsumedProgress from '@/components/charts/consumed-progress/consumed-progress';
@Component({
    name: 'top-providers-popup-card',
    components: {
        'material-icon': GoogleMaterialIcon,
        'progress-bar': ProgressBar,
        'font-awesome': FontAwesomeIcon,
        'consumed-progress': ConsumedProgress,
    },
})

export default class TopProvidersPopupCard extends Vue {

    private itrate: any = ['0%', '10%', '30%', '40%', '50%', '60%'];



    // -----------------------------------------------------------------------
    // Actions

    // ------------------------------------------------------------------------
    // Hooks


    // --------------------------------------------------------------------------
    // Methods

}

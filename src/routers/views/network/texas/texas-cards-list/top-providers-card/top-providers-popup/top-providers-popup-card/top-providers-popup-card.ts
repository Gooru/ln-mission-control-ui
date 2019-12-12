import {Component, Vue, Prop} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import PerformanceProgress from '@/components/charts/performance-progress/performance-progress';
import FontAwesomeIcon from '@/components/icons/font-awesome-icon/font-awesome-icon';
@Component({
    name: 'top-providers-popup-card',
    components: {
        'material-icon': GoogleMaterialIcon,
        'performance-bar': PerformanceProgress,
        'font-awesome': FontAwesomeIcon,
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

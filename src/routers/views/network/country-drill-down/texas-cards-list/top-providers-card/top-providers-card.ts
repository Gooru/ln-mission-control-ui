import {Component, Vue, Prop} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import TopProvidersPopup from './top-providers-popup/top-providers-popup';

@Component({
    name: 'top-providers-card',
    components: {
        'material-icon': GoogleMaterialIcon,
        'top-providers-popup': TopProvidersPopup,
    },
})

export default class TopProvidersCard extends Vue {

    // ---------------------------------------------------------------------------
    // Properties

    private isShowPopup: boolean = false;

    private isEnablePopup: boolean = true;




    // -----------------------------------------------------------------------------
    // Actions

    private closePopup(show: boolean = false) {
        this.isShowPopup = show;
    }



}

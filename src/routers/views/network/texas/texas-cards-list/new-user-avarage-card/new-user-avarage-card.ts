import {Component, Vue, Prop} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import NewUserPopup from './new-user-popup/new-user-popup';
import AvgSessionPopup from './avg-session-popup/avg-session-popup';

@Component({
    name: 'new-user-avarage-card',
    components: {
        'material-icon': GoogleMaterialIcon,
        'new-user-popup': NewUserPopup,
        'avg-session-popup': AvgSessionPopup,
    },
})

export default class NewUserAvarageCard extends Vue {

    // ---------------------------------------------------------------------------
    // Properties
    @Prop()
    private cardName?: string;
    @Prop()
    private cardTitle?: string;
    @Prop()
    private iconName?: string;

    private isShowPopup: boolean = false;




    // -----------------------------------------------------------------------------
    // Actions

    private closePopup(show: boolean = false) {
        this.isShowPopup = show;
    }



}

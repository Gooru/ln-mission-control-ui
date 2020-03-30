import {Component, Vue, Prop} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import NewUserPopup from './new-user-popup/new-user-popup';
import AvgSessionPopup from './avg-session-popup/avg-session-popup';
import { numberFormat } from '@/helpers/number-format';

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
    @Prop()
    private cardValue?: string;
    @Prop()
    private cardData?: any;
    @Prop()
    private sinceMonth?: string;
    @Prop()
    private nextLevelName: any;

    @Prop()
    private isTenant?: boolean;

    private isShowPopup: boolean = false;

    private hiddenData: boolean = false;


    // -----------------------------------------------------------------------------
    // Actions

    private closePopup(show: boolean = false) {
        this.isShowPopup = show;
    }

    // -----------------------------------------------------------------------------
    // Method

    private numberFormat(value: number) {
        return numberFormat(value);
    }

    private isLowPercent(value: string = '0') {
        const percent = parseFloat(value) / 100.0;
        return Math.sign(percent);
    }

}

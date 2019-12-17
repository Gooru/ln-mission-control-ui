import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import NewUserAvarageCard from './new-user-avarage-card/new-user-avarage-card';
import CompentencyGainedCard from './competency-gained-card/competency-gained-card';
import TopProvidersCard from './top-providers-card/top-providers-card';
import {getSum} from '@/utils/utils';
import {formatTime} from '@/utils/date';
import StrugglingCompetency from './stuggling-competency/stuggling-competency';

@Component({
    name: 'texas-cards-list',
    components: {
        'material-icon': GoogleMaterialIcon,
        'new-user-card': NewUserAvarageCard,
        'competency-gained-card': CompentencyGainedCard,
        'top-providers': TopProvidersCard,
        'struggling-competency': StrugglingCompetency,
    },
})

export default class TexasCardsList extends Vue {
    @Prop()
    private dataList: any;
    @Prop()
    private countryData: any;
    @Prop()
    private selectedDate: any;
    @Prop()
    private subjectsList: any;
    @Prop()
    private competencyData: any;
    @Prop()
    private seletedLevel: any;
    @Prop()
    private cardDetails: any;

    private hiddenData: boolean = false;


    // -------------------------------------------------------------------------------
    // Methods

}

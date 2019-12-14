import {Component, Vue, Prop} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import NewUserAvarageCard from './new-user-avarage-card/new-user-avarage-card';
import CompentencyGainedCard from './competency-gained-card/competency-gained-card';
import TopProvidersCard from './top-providers-card/top-providers-card';
import {getSum} from '@/utils/utils';
import {formatTime} from '@/utils/date';

@Component({
    name: 'texas-cards-list',
    components: {
        'material-icon': GoogleMaterialIcon,
        'new-user-card': NewUserAvarageCard,
        'competency-gained-card': CompentencyGainedCard,
        'top-providers': TopProvidersCard,
    },
})

export default class TexasCardsList extends Vue {
    @Prop()
    private dataList: any;
    @Prop()
    private countryData: any;
    @Prop()
    private averagePerformance: any;
    @Prop()
    private selectedDate: any;
    @Prop()
    private subjectsList: any;


    // -------------------------------------------------------------------------------
    // Methods

    private getSumValue(value: any) {
        return formatTime(getSum(value, 'timespent'));
    }
}

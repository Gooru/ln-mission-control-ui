import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import NewUserAvarageCard from './new-user-avarage-card/new-user-avarage-card';
import CompentencyGainedCard from './competency-gained-card/competency-gained-card';
import TopProvidersCard from './top-providers-card/top-providers-card';
import {getSum} from '@/utils/utils';
import {formatTime} from '@/utils/date';
import StrugglingCompetency from './stuggling-competency/stuggling-competency';
import { SubjectModel } from '@/models/drill-down/subject';
import { CompetencyModel } from '@/models/drill-down/competency';
import { DrillDownModel } from '@/models/drill-down/drill-down';

@Component({
    name: 'cards-list',
    components: {
        'material-icon': GoogleMaterialIcon,
        'new-user-card': NewUserAvarageCard,
        'competency-gained-card': CompentencyGainedCard,
        'top-providers': TopProvidersCard,
        'struggling-competency': StrugglingCompetency,
    },
})

export default class CardsList extends Vue {
    @Prop()
    private countryData: any;
    @Prop()
    private selectedDate: any;
    @Prop()
    private subjectsList?: SubjectModel[];
    @Prop()
    private competencyData?: CompetencyModel;
    @Prop()
    private seletedLevel?: DrillDownModel;
    @Prop()
    private cardDetails: any;


    private hiddenData: boolean = false;

    private get competencyScore() {
        if (this.competencyData) {
            return this.competencyData.overallStats ? this.competencyData.overallStats : {};
        } else {
            return {};
        }

    }


    // -------------------------------------------------------------------------------
    // Methods

}

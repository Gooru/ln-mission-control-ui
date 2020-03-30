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
import { numberFormat } from '@/helpers/number-format';
import moment from 'moment';
import { sessionService } from '@/providers/services/auth/session';
import { DEMO_USERS } from '@/utils/constants';

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
    @Prop()
    private studentList: any;

    private hiddenData: boolean = false;

    get session() {
        return sessionService.getSession();
    }

    get isTenant() {
        if (this.session) {
          return (this.session.isSuperAdmin) ||
           (this.session.user_id && DEMO_USERS.indexOf(this.session.user_id) !== -1);
        }
        return false;
      }

    private get sinceMonth() {
       return this.cardDetails.month_since ?
             this.cardDetails.month_since : moment().subtract(1, 'month').format('MMMM');
    }

    private get competencyScore() {
        if (this.competencyData && this.seletedLevel && this.seletedLevel.type !== 'class') {
            return this.competencyData.overallStats ? this.competencyData.overallStats : {};
        } else {
            const totalCompetency = this.studentList.reduce((a: any, b: any) => a + b.completedCompetencies, 0);
            const totalAvg = this.studentList.reduce((a: any, b: any) => (a + b.percentScore) , 0);
            return {
                totalCompetencies: totalCompetency,
                averagePerformance: Math.floor(totalAvg / this.studentList.length),
            };
        }

    }

    private get nextLevelName() {
        return this.seletedLevel ? (this.seletedLevel.type !== 'system' ?
         this.seletedLevel.type : this.seletedLevel.subType) : 'country';
    }


    // -------------------------------------------------------------------------------
    // Methods

    private numberFormat(value: number) {
        return numberFormat(value);
    }
}

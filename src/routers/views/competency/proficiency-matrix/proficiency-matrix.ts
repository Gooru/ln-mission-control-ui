import { Vue, Component, Prop } from 'vue-property-decorator';
import LearnerProficiencyChart from '@/components/charts/learner-proficiency-chart/learner-proficiency-chart';
import moment from 'moment';
import DomainCard from '@/components/cards/domain-card/domain-card';

@Component({
    name: 'proficiency-matrix',
    components: {
        'learner-proficiency-chart': LearnerProficiencyChart,
        'domain-card': DomainCard,
    },
})

export default class ProficiencyMatrix extends Vue {

    @Prop()
    private subject: any;

    @Prop()
    private userId: any;

    private month: string = moment().format('MM');

    private year: string = moment().format('YYYY');

    private domainList?: any = [];


    // -----------------------------------------------------------------
    // Action

    private loadingDomain(domains: any) {
        this.domainList = domains;
    }

}

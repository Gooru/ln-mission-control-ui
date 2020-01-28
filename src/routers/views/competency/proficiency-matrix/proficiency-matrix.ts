import { Vue, Component, Prop } from 'vue-property-decorator';
import LearnerProficiencyChart from '@/components/charts/learner-proficiency-chart/learner-proficiency-chart';
import moment from 'moment';
import DomainCard from '@/components/cards/domain-card/domain-card';
import GradeLevelCard from '@/components/cards/grade-level-card/grade-level-card';
import CompetencyCard from '@/components/cards/competency-card/competency-card';

@Component({
    name: 'proficiency-matrix',
    components: {
        'learner-proficiency-chart': LearnerProficiencyChart,
        'domain-card': DomainCard,
        'grade-level-card': GradeLevelCard,
        'competency-card': CompetencyCard,
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

    private gradeCompetency?: any = [];

    private isDomainView: boolean = false;

    private isGradeView: boolean = false;

    private activeGrade: any = null;

    private isCompetencyView: boolean = false;

    private activeCompetency: any = null;

    // -----------------------------------------------------------------
    // Action

    private loadingDomain(domains: any) {
        this.domainList = domains;
        this.isDomainView = true;
        this.isGradeView = false;
        this.isCompetencyView = false;
    }

    private backAction() {
        this.$emit('backAction');
    }

    private onSelectGrade(gradeDomains: [], activeGrade: any, gradeBoundaries: []) {
        this.activeGrade = activeGrade;
        this.getCompetencyListForGrade(gradeDomains, activeGrade, gradeBoundaries);
        this.isDomainView = false;
        this.isGradeView = true;
        this.isCompetencyView = false;
    }

    private onCloseGrade() {
        this.isDomainView = true;
        this.isGradeView = false;
        this.isCompetencyView = false;
    }

    private onSelectCompetency(competency: any) {
        this.isDomainView = false;
        this.isGradeView = false;
        this.isCompetencyView = true;
        this.activeCompetency = competency;
    }

    // -----------------------------------------------------------------------------
    // Methods

    private getCompetencyListForGrade(gradeDomains: [], activeGrade: any, gradeBoundaries: []) {
        let competencyList: any = [];
        if (gradeBoundaries.length && gradeDomains.length) {
            gradeDomains.map((domain: any) => {
                if (gradeBoundaries.some((gradeDomain: any) => {
                    return domain.domainCode === gradeDomain.domainCode;
                })) {
                    competencyList = [...competencyList, ...domain.competencies];
                }
            });
        }
        this.gradeCompetency = competencyList;
    }
}

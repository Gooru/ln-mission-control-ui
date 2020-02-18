import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import LearnerProficiencyChart from '@/components/charts/learner-proficiency-chart/learner-proficiency-chart';
import moment from 'moment';
import DomainCard from '@/components/cards/domain-card/domain-card';
import GradeLevelCard from '@/components/cards/grade-level-card/grade-level-card';
import CompetencyCard from '@/components/cards/competency-card/competency-card';
import Axios from 'axios';
import { searchAPI } from '@/providers/apis/search/search';
import { taxonomyAPI } from '@/providers/apis/taxonomy/taxonomy';
import { getSubjectId, getDomainId, getCourseId } from '@/utils/utils';
import { GOORU_DEFAULT_FRAMEWORK, MICRO_COMPETENCY_CODE_TYPES } from '@/utils/constants';
import LearningMapContent from '@/components/cards/learning-map-content/learning-map-content';
import { MicroCompetencyModel } from '@/models/content/micro-competency';

@Component({
    name: 'proficiency-matrix',
    components: {
        'learner-proficiency-chart': LearnerProficiencyChart,
        'domain-card': DomainCard,
        'grade-level-card': GradeLevelCard,
        'competency-card': CompetencyCard,
        'learning-map-content': LearningMapContent,
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

    private isCompetencyActive: boolean = false;

    private learningMapContent: any = [];

    private prerequisites: any = [];

    private microCompetency: MicroCompetencyModel[] | any = [];

    private fwCode: string = GOORU_DEFAULT_FRAMEWORK;

    private microCompetencyCodes: any = MICRO_COMPETENCY_CODE_TYPES;

    private isLoading: boolean = false;

    private isLearningMapContent: boolean = false;

    private selectedContent: string = '';

    get subjectId() {
        return this.activeCompetency ? getSubjectId(this.activeCompetency.competencyCode) : '';
    }

    get domainId() {
        return this.activeCompetency ? getDomainId(this.activeCompetency.competencyCode) : '';
    }

    get courseId() {
        return this.activeCompetency ? getCourseId(this.activeCompetency.competencyCode) : '';
    }


    @Watch('activeCompetency')
    private onChangeCompetencyCode(code: any) {
        this.fetchLearningMapContent(code.competencyCode);
    }

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
        this.isCompetencyActive = false;
    }

    private onSelectCompetency(competency: any) {
        this.isDomainView = false;
        this.isGradeView = false;
        this.isCompetencyView = true;
        this.activeCompetency = competency;
        this.isCompetencyActive = true;
    }

    private onChangeGraphView(isActive: boolean) {
        this.isCompetencyActive = isActive;
        if (!this.isCompetencyView) {
            this.isCompetencyActive = false;
        }
    }

    private onSelectContent(content: string) {
        this.selectedContent = content;
        this.isLearningMapContent = true;
    }

    private onCloseLearningMap() {
        this.selectedContent = '';
        this.isLearningMapContent = false;
    }

    private onSelectMicro(competencyIndex: any) {
        this.microCompetency.map((competency: any, index: number) => {
            competency.isExpanded = false;
            if (competencyIndex === index) {
                competency.isExpanded = true;
            }
        });
    }

    private onSelectDep(prerequisiteIndex: any) {
        this.prerequisites.map((prerequisite: any, index: number) => {
            prerequisite.isExpanded = false;
            if (prerequisiteIndex === index) {
                prerequisite.isExpanded = true;
            }
        });
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

    private fetchLearningMapContent(competencyCode: any) {
        this.isLoading = true;
        const competencyPromise = taxonomyAPI.fetchCodes(this.fwCode, this.subjectId, this.courseId, this.domainId);
        Axios.all([
            searchAPI.fetchLearningMapContents(competencyCode),
            competencyPromise,
        ]).then(Axios.spread((learningMap, competencyCodes: any) => {
            this.learningMapContent = learningMap;
            this.microCompetency = this.filterMicroCompetency(competencyCodes);
            this.prerequisites = learningMap.prerequisites;
            this.isLoading = false;
        }));
    }

    private filterMicroCompetency(codes: any) {
        const standardCode = this.activeCompetency.competencyCode;
        const regex = new RegExp(standardCode);
        const microCompetencies = codes.filter((code: any) => {
            return (
                regex.test(code.id) &&
                (this.microCompetencyCodes.indexOf(code.codeType) !== -1)
            );
        });
        return microCompetencies;
    }
}

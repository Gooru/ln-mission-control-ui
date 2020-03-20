import { Component, Vue, Prop } from 'vue-property-decorator';
import LearnerProficiencyChart from '@/components/charts/learner-proficiency-chart/learner-proficiency-chart';
import SubjectInfoPanel from '@/components/proficiency/subject-info-panel/subject-info-panel';
import DomainsListPanel from '@/components/proficiency/domains-list-panel/domains-list-panel';
import DomainInfoPanel from '@/components/proficiency/domain-info-panel/domain-info-panel';
import CompetencyInfoPanel from '@/components/proficiency/competency-info-panel/competency-info-panel';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import MonthYearPicker from '@/components/selector/month-year-picker/month-year-picker';
import { SubjectModel } from '@/models/taxonomy/subject';
import { DomainModel } from '@/models/proficiency/domain';
import { ClassificationModel } from '@/models/taxonomy/classification';
import { CompetencyModel } from '@/models/proficiency/competency';
import { taxonomyAPI } from '@/providers/apis/taxonomy/taxonomy';
import axios from 'axios';
import moment from 'moment';

@Component({
  name: 'learner-proficiency',
  components: {
    'learner-proficiency-chart': LearnerProficiencyChart,
    'domains-list-panel': DomainsListPanel,
    'google-material-icon': GoogleMaterialIcon,
    'subject-info-panel': SubjectInfoPanel,
    'month-year-picker': MonthYearPicker,
    'domain-info-panel': DomainInfoPanel,
    'competency-info-panel': CompetencyInfoPanel,
  },
})
export default class LearnerProficiency extends Vue {

  get subjectCode() {
    return this.activeSubject ? this.activeSubject.code : 'K12.MA';
  }

  private categories!: ClassificationModel[];

  private subjects!: SubjectModel[];

  private activeToggleList: string = '';

  @Prop()
  private defaultCategoryId: string = 'k_12';

  @Prop()
  private classificationCode!: string;

  @Prop()
  private defaultSubjectCode: string = 'K12.MA';

  @Prop()
  private activeCategory!: ClassificationModel;

  @Prop()
  private activeSubject!: SubjectModel | any;

  private isShowCategories: boolean = false;

  private isShowSubjects: boolean = false;

  @Prop()
  private activeTimeline!: string;

  @Prop()
  private userId!: string;

  private activeDomainInfo!: DomainModel;

  private activeDomainSeq: number = 0;

  private isShowDomainInfo: boolean = false;

  private portfolioDomain!: any;

  private activeCompetency: CompetencyModel = {
    competencyCode: '',
    competencyDesc: '',
    competencyName: '',
    competencySeq: 0,
    competencyStudentDesc: '',
    status: 0,
  };

  private activeCompetencySeq!: number;

  private isShowCompetencyPanel: boolean = false;
  @Prop()
  private month!: string;

  @Prop()
  private year!: string;

  private get isLevelContent() {
    return this.activeToggleList && this.activeToggleList !== '';
  }

  public created() {
    this.loadTaxonomyData();
  }

  public onSelectCategory(category: ClassificationModel) {
    const component = this;
    component.activeCategory = category;
    component.fetchTaxonomySubjects(category.id).then((taxonomySubjects: SubjectModel[]) => {
      component.subjects = taxonomySubjects;
      component.activeSubject = taxonomySubjects.find(
        (subject: SubjectModel) => component.defaultSubjectCode === subject.code);
    });
    component.isShowCategories = false;
  }

  public onSelectSubject(subject: SubjectModel) {
    const component = this;
    component.activeSubject = subject;
    component.isShowSubjects = false;
  }

  public onChageTimeline(timeline: string) {
    this.activeTimeline = timeline;
  }

  public loadTaxonomyData() {
    const component = this;
    // axios.all([
    //   taxonomyAPI.fetchTaxonomyClassifications(),
    //   component.fetchTaxonomySubjects(),
    // ]).then(axios.spread((subjectClassifications: any, taxonomySubjects: any) =>  {
    //   component.categories = subjectClassifications;
    //   component.subjects = taxonomySubjects;
    //   component.activeSubject = taxonomySubjects.find((subject: any) =>
    //     subject.code === component.defaultSubjectCode,
    //   );
    //   component.activeCategory = subjectClassifications.find(
    //     (category: any) => category.id === component.defaultCategoryId,
    //   );
    // }));
  }

  private onSelectDomain(domain: DomainModel) {
    this.activeDomainInfo = domain;
    this.activeDomainSeq = domain.domainSeq;
    this.isShowDomainInfo = true;
    this.activeToggleList = 'ShowDomainList';
  }

  private onSelectPortfolioStat(portfolio: DomainModel) {
    this.activeDomainInfo = portfolio;
    this.activeDomainSeq = portfolio.domainSeq;
    this.isShowDomainInfo = true;
    if (portfolio.competencies) {
      this.portfolioDomain = portfolio.competencies;
    }
    this.activeToggleList = 'ShowPortfolioContainer';
  }

  private onSelectCompetency(competency: CompetencyModel) {
    this.isShowDomainInfo = false;
    this.isShowCompetencyPanel = true;
    this.activeCompetencySeq = competency.competencySeq;
    this.activeCompetency = competency;
  }

  private onSelectLearnerCompetency(competency: CompetencyModel) {
   this.onSelectCompetency(competency);
   this.activeToggleList = '';
  }


  private onCloseDomainInfoPanel() {
    this.isShowDomainInfo = false;
    this.activeDomainSeq = 0;
  }

  private onCloseCompetencyInfoPanel() {
    if (this.isLevelContent) {
      this.isShowDomainInfo = true;
    }
    this.isShowCompetencyPanel = false;
  }

  private backAction() {
    this.$emit('backAction');
  }

  private fetchTaxonomySubjects(subjectId: string = '') {
    const component = this;
    return taxonomyAPI.fetchTaxonomySubjects(subjectId || component.defaultCategoryId);
  }
}

import { Component, Vue, Prop } from 'vue-property-decorator';
import LearnerProficiencyChart from '@/components/charts/learner-proficiency-chart/learner-proficiency-chart';
import SubjectInfoPanel from '@/components/proficiency/subject-info-panel/subject-info-panel';
import DomainsListPanel from '@/components/proficiency/domains-list-panel/domains-list-panel';
import DomainInfoPanel from '@/components/proficiency/domain-info-panel/domain-info-panel';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import MonthYearPicker from '@/components/selector/month-year-picker/month-year-picker';
import { SubjectModel } from '@/models/taxonomy/subject';
import { DomainModel } from '@/models/proficiency/domain';
import { ClassificationModel } from '@/models/taxonomy/classification';
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
  },
})
export default class LearnerProficiency extends Vue {

  get subjectCode() {
    return this.activeSubject ? this.activeSubject.code : 'K12.MA';
  }

  private categories!: ClassificationModel[];

  private subjects!: SubjectModel[];

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

  private isShowDomainInfo: boolean = false;

  @Prop()
  private month: string = moment().format('MM');

  @Prop()
  private year: string = moment().format('YYYY');

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
    this.isShowDomainInfo = true;
  }

  private onCloseDomainInfoPanel() {
    this.isShowDomainInfo = false;
  }

  private backAction() {
    this.$emit('backAction');
  }

  private fetchTaxonomySubjects(subjectId: string = '') {
    const component = this;
    return taxonomyAPI.fetchTaxonomySubjects(subjectId || component.defaultCategoryId);
  }
}

import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import LearnerAcrossFacetsChart from '@/components/charts/learner-across-facets-chart/learner-across-facets-chart';
import LearnerProficiency from '@/components/proficiency/learner-proficiency/learner-proficiency';
import FacetsInfoPanel from '@/components/proficiency/facets-info-panel/facets-info-panel';
import MonthYearPicker from '@/components/selector/month-year-picker/month-year-picker';
import TaxonomyFilter from '@/components/selector/taxonomy-filter/taxonomy-filter';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { SubjectModel } from '@/models/taxonomy/subject';
import { User } from '@/models/profile/user';
import { profileAPI } from '@/providers/apis/profile/profile';
import moment from 'moment';

@Component({
  name: 'learner-facets-proficiency',
  components: {
    'learner-across-facets-chart': LearnerAcrossFacetsChart,
    'facets-info-panel': FacetsInfoPanel,
    'month-year-picker': MonthYearPicker,
    'learner-proficiency': LearnerProficiency,
    'taxonomy-filter': TaxonomyFilter,
    'google-material-icon': GoogleMaterialIcon,
  },
})

export default class LearnerFacetsProficiency extends Vue {

  private get learnerId() {
    return this.$route.params.id;
  }

  public activeMonth: string = moment().format('MM');

  public activeYear: string = moment().format('YYYY');

  private activeClassificationCode: string = 'k_12';

  private activeSubjectCode: string = 'K12.MA';

  private isShowFacetsProficiency: boolean = true;

  private activeFacets: SubjectModel[] = [];

  private activeSubject!: SubjectModel;

  private learner: User = {};

  private isShowExpandedFacetChart: boolean = true;

  public onChageTimeline(timeline: string) {
    const component = this;
    component.activeYear = moment(timeline).format('YYYY');
    component.activeMonth = moment(timeline).format('MM');
  }

  private created() {
    this.loadUserData();
  }

  private onSelectSubject(subject: SubjectModel) {
    this.activeClassificationCode = subject.code.split('.')[0];
    this.activeSubject = subject;
    this.isShowFacetsProficiency = false;
  }

  private onClickBack() {
    this.$router.back();
  }

  private backAction() {
    this.isShowFacetsProficiency = true;
  }

  private onSelectPortfolioStat(portfolioStat: any) {
    const subject: SubjectModel | any = this.activeFacets.find(
      (activeFacet: SubjectModel) => activeFacet.code === portfolioStat.subjectCode );
    this.activeClassificationCode = subject.code.split('.')[0];
    this.activeSubject = subject;
    this.isShowFacetsProficiency = false;
  }

  private listActiveFacets(facets: SubjectModel[]) {
    this.activeFacets = facets;
  }

  private loadUserData() {
    const component = this;
    profileAPI.fetchUserProfiles(component.learnerId).then((userProfile: User[]) => {
      component.learner = userProfile[0];
    });
  }
}

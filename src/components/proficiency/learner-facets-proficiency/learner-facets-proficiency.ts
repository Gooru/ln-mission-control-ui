import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import LearnerAcrossFacetsChart from '@/components/charts/learner-across-facets-chart/learner-across-facets-chart';
import LearnerProficiency from '@/components/proficiency/learner-proficiency/learner-proficiency';
import FacetsInfoPanel from '@/components/proficiency/facets-info-panel/facets-info-panel';
import MonthYearPicker from '@/components/selector/month-year-picker/month-year-picker';
import TaxonomyFilter from '@/components/selector/taxonomy-filter/taxonomy-filter';
import { SubjectModel } from '@/models/taxonomy/subject';
import moment from 'moment';

@Component({
  name: 'learner-facets-proficiency',
  components: {
    'learner-across-facets-chart': LearnerAcrossFacetsChart,
    'facets-info-panel': FacetsInfoPanel,
    'month-year-picker': MonthYearPicker,
    'learner-proficiency': LearnerProficiency,
    'taxonomy-filter': TaxonomyFilter,
  },
})

export default class LearnerFacetsProficiency extends Vue {

  public activeMonth: string = moment().format('MM');

  public activeYear: string = moment().format('YYYY');

  private activeClassificationCode: string = 'k_12';

  private activeSubjectCode: string = 'K12.MA';

  private isShowFacetsProficiency: boolean = true;

  private activeFacets: SubjectModel[] = [];

  private activeSubject!: SubjectModel;

  public onChageTimeline(timeline: string) {
    const component = this;
    component.activeYear = moment(timeline).format('YYYY');
    component.activeMonth = moment(timeline).format('MM');
  }

  private onSelectSubject(subject: SubjectModel) {
    this.activeClassificationCode = subject.code.split('.')[0];
    this.activeSubject = subject;
    this.isShowFacetsProficiency = false;
  }

  private backAction() {
    this.isShowFacetsProficiency = true;
  }

  private listActiveFacets(facets: SubjectModel[]) {
    this.activeFacets = facets;
  }
}

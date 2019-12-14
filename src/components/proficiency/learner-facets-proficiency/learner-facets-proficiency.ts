import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import LearnerAcrossFacetsChart from '@/components/charts/learner-across-facets-chart/learner-across-facets-chart';
import FacetsInfoPanel from '@/components/proficiency/facets-info-panel/facets-info-panel';
import MonthYearPicker from '@/components/selector/month-year-picker/month-year-picker';
import moment from 'moment';

@Component({
  name: 'learner-facets-proficiency',
  components: {
    'learner-across-facets-chart': LearnerAcrossFacetsChart,
    'facets-info-panel': FacetsInfoPanel,
    'month-year-picker': MonthYearPicker,
  },
})

export default class LearnerFacetsProficiency extends Vue {

  public activeMonth: string = moment().format('MM');

  public activeYear: string = moment().format('YYYY');

  public onChageTimeline(timeline: string) {
    const component = this;
    component.activeYear = moment(timeline).format('YYYY');
    component.activeMonth = moment(timeline).format('MM');
  }
}

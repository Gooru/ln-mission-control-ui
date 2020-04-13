import {Vue, Component, Prop} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import SummaryChart from '@/components/charts/summary-chart/summary-chart';
import { LEARNING_MAP_CONTENT_TYPE } from '@/utils/constants';
import MCIcon from '@/components/icons/mc-icon/mc-icon';

@Component({
    name: 'summary-content',
    components: {
        'material-icon': GoogleMaterialIcon,
        'mc-icon': MCIcon,
        'summary-chart': SummaryChart,
    },
})

export default class SummaryContent extends Vue {

    @Prop()
    private activeComponent: any;

    private get summaryCatalogFooter() {
      return LEARNING_MAP_CONTENT_TYPE.filter((item) => item.isCatalog) || [];
    }

    private get summaryResources() {
        return this.$store.state.activityStore.summaryResource;
    }

    private get summaryQuestions() {
      return this.$store.state.activityStore.summaryQuestion;
    }

    private get learnerContent() {
      return this.$store.state.activityStore.learnerContent;
    }

   private summaryDefaultfilter: any = {
    'aggBy': 'contentSubFormat',
    'flt.audience': 'All Students,Teachers',
   };

   private contentData: any = {
    filters: this.summaryDefaultfilter,
    contentType: 'question',
  };

  private resourceAggregatedFilters: any = {
    filters: this.summaryDefaultfilter,
    contentType: 'resource',
  };


  private created() {
      const params: any = {
        resource: this.resourceAggregatedFilters,
        question: this.contentData,
      };
      this.$store.dispatch('activityStore/fetcSummaryCatalog', params);

      this.$store.dispatch('activityStore/fetachLearnerContent');
  }

}

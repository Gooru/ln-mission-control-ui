import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
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

    private get summaryCatalogFooter() {
      return LEARNING_MAP_CONTENT_TYPE
      .filter((item: any) => item.isSummaryFooter)
      .sort((a: any, b: any) => a.isSummaryFooterSeq - b.isSummaryFooterSeq);
    }

    private get summaryResources() {
        return this.$store.state.activityStore.summaryResource;
    }

    private get summaryQuestions() {
      return this.$store.state.activityStore.summaryQuestion;
    }

    private get learnerContent() {
      return this.$store.state.activityStore.learnerContent[0] || {};
    }

    @Prop()
    private activeComponent: any;

    @Prop()
    private filterParams: any;

    @Watch('filterParams', {deep: true})
    private onChangeParams(value: any) {
      this.onLoad();
    }


  private created() {
      this.onLoad();
  }

  private onLoad() {
    const params: any = {
      resource: this.filterParams,
      question: this.filterParams,
    };
    this.$store.dispatch('activityStore/fetcSummaryCatalog', params);

    this.$store.dispatch('activityStore/fetachLearnerContent', {param: this.filterParams});
  }

}

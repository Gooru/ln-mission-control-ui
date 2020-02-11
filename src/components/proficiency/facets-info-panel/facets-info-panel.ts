import { Component, Vue, Prop } from 'vue-property-decorator';
import MindsetsListPanel from '@/components/proficiency/mindsets-list-panel/mindsets-list-panel';
import PortfolioPanel from '@/components/proficiency/portfolio-panel/portfolio-panel';
import PreferencesPanel from '@/components/proficiency/preferences-panel/preferences-panel';
import { SubjectModel } from '@/models/taxonomy/subject';

@Component({
  name: 'facets-info-panel',
  components: {
    'mindsets-list-panel': MindsetsListPanel,
    'portfolio-panel': PortfolioPanel,
    'preferences-panel': PreferencesPanel,
  },
})
export default class FacetsInfoPanel extends Vue {

  @Prop()
  private userId!: string;

  @Prop()
  private month!: string;

  @Prop()
  private year!: string;

  @Prop()
  private activeFacets!: SubjectModel[];

  private activeTab: object = {
    label: 'Portfolio',
    component: 'portfolio-panel',
  };

  private tabItems = [
    {
      label: 'Portfolio',
      component: 'portfolio-panel',
    },
    {
      label: 'Mindsets',
      component: 'mindsets-list-panel',
    },
    {
      label: 'Preferences',
      component: 'preferences-panel',
    },
  ];

  private onSelectPortfolioStat(portfolioStat: any) {
    this.$emit('onSelectPortfolioStat', portfolioStat);
  }
}

import { Component, Vue, Prop } from 'vue-property-decorator';
import MindsetsPanel from '@/components/proficiency/mindsets-panel/mindsets-panel';
import CommunityPanel from '../community-panel/community-panel';
import KnowledgePanel from '../knowledge-panel/knowledge-panel';
import { SubjectModel } from '@/models/taxonomy/subject';

@Component({
  name: 'facets-info-panel',
  components: {
    'mindsets-panel': MindsetsPanel,
    'knowledge-panel': KnowledgePanel,
    'community-panel': CommunityPanel,
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
    label: 'Knowledge',
    component: 'knowledge-panel',
  };

  private tabItems = [
    {
      label: 'Knowledge',
      component: 'knowledge-panel',
    },
    {
      label: 'Mindsets',
      component: 'mindsets-panel',
    },
    {
      label: 'Community',
      component: 'community-panel',
    },
  ];

  private onSelectPortfolioStat(portfolioStat: any) {
    this.$emit('onSelectPortfolioStat', portfolioStat);
  }
}

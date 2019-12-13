import { Component, Vue, Prop } from 'vue-property-decorator';
import MindsetsListPanel from '@/components/proficiency/mindsets-list-panel/mindsets-list-panel';
import PortfolioPanel from '@/components/proficiency/portfolio-panel/portfolio-panel';
import PreferencesPanel from '@/components/proficiency/preferences-panel/preferences-panel';

@Component({
  name: 'facets-info-panel',
  components: {
    'mindsets-list-panel': MindsetsListPanel,
    'portfolio-panel': PortfolioPanel,
    'preferences-panel': PreferencesPanel,
  },
})
export default class FacetsInfoPanel extends Vue {

  private activeTab: object = {
    label: 'Mindsets',
    component: 'mindsets-list-panel',
  };

  private tabItems = [
    {
      label: 'Mindsets',
      component: 'mindsets-list-panel',
    },
    {
      label: 'Portfolio',
      component: 'portfolio-panel',
    },
    {
      label: 'Preferences',
      component: 'preferences-panel',
    },
  ];
}

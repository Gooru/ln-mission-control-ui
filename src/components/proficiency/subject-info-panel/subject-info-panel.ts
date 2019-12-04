import { Component, Vue, Prop } from 'vue-property-decorator';
import DomainsListPanel from '@/components/proficiency/domains-list-panel/domains-list-panel';
import MindsetsListPanel from '@/components/proficiency/mindsets-list-panel/mindsets-list-panel';
import PortfolioPanel from '@/components/proficiency/portfolio-panel/portfolio-panel';
import PreferencesPanel from '@/components/proficiency/preferences-panel/preferences-panel';

@Component({
  name: 'subject-info-panel',
  components: {
    'domains-list-panel': DomainsListPanel,
    'mindsets-list-panel': MindsetsListPanel,
    'portfolio-panel': PortfolioPanel,
    'preferences-panel': PreferencesPanel,
  },
})

export default class SubjectInfoPanel extends Vue {

  @Prop()
  public classification: object = {};

  @Prop()
  public subject: object = {};

  public activeTab: object = {
    title: 'Domains',
    component: 'domains-list-panel',
  };

  public tabItems = [
    {
      title: 'Domains',
      component: 'domains-list-panel',
    },
    {
      title: 'Mindsets',
      component: 'mindsets-list-panel',
    },
    {
      title: 'Portfolio',
      component: 'portfolio-panel',
    },
    {
      title: 'Preferences',
      component: 'preferences-panel',
    },
  ];
}

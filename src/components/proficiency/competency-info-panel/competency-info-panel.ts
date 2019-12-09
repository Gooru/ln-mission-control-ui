import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import LearningMap from '@/components/competency/learning-map/learning-map';
import MindsetsListPanel from '@/components/proficiency/mindsets-list-panel/mindsets-list-panel';
import PortfolioPanel from '@/components/proficiency/portfolio-panel/portfolio-panel';
import PreferencesPanel from '@/components/proficiency/preferences-panel/preferences-panel';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import {CompetencyModel} from '@/models/proficiency/competency';
import { competencyStatus } from '@/helpers/competency';

@Component({
  name: 'competency-info-panel',
  components: {
    'learning-map': LearningMap,
    'google-material-icon': GoogleMaterialIcon,
    'portfolio-panel': PortfolioPanel,
    'preferences-panel': PreferencesPanel,
    'mindsets-list-panel': MindsetsListPanel,
  },
})

export default class CompetencyInfoPanel extends Vue {

  @Prop()
  private competency!: CompetencyModel;

  private activeTab: object = {
    title: 'Portfolio',
  };

  private tabItems = [
    {
      title: 'Portfolio',
      component: 'portfolio-panel',
    },
    {
      title: 'Mindsets',
      component: 'mindsets-list-panel',
    },
    {
      title: 'Preferences',
      component: 'preferences-panel',
    },
    {
      title: 'Route',
    },
    {
      title: 'Metadata',
    },
    {
      title: 'Learning Map',
    },
  ];


  private competencyLevel() {
    return this.competency.competencyStatus ? competencyStatus(this.competency.competencyStatus) : '';
  }

}

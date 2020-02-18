import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import LearningMap from '@/components/competency/learning-map/learning-map';
import MindsetsListPanel from '@/components/proficiency/mindsets-list-panel/mindsets-list-panel';
import PortfolioPanel from '@/components/proficiency/portfolio-panel/portfolio-panel';
import PreferencesPanel from '@/components/proficiency/preferences-panel/preferences-panel';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import MetadataPanel from '../metadata-panel/metadata-panel';
import {CompetencyModel} from '@/models/proficiency/competency';
import { competencyStatus } from '@/helpers/competency';
import { searchAPI } from '@/providers/apis/search/search';
import moment from 'moment';

@Component({
  name: 'competency-info-panel',
  components: {
    'learning-map': LearningMap,
    'google-material-icon': GoogleMaterialIcon,
    'portfolio-panel': PortfolioPanel,
    'preferences-panel': PreferencesPanel,
    'mindsets-list-panel': MindsetsListPanel,
    'metadata-panel': MetadataPanel,
  },
})

export default class CompetencyInfoPanel extends Vue {

  @Prop()
  private competency!: CompetencyModel;

  private activeTab: object = {
    title: 'Portfolio',
    component: 'portfolio-panel',
  };

  @Prop()
  private userId!: string;

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
      title: 'Metadata',
      component: 'metadata-panel',
    },
    {
      title: 'LearningMap',
      component: 'learning-map',
    },
    {
      title: 'Route',
    },
  ];

  @Prop()
  private month!: string;

  @Prop()
  private year!: string;

  private learningMapData!: any;

  @Watch('competency')
  private onChangeCompetency() {
    this.loadLearningMapContents();
  }

  private created() {
    this.loadLearningMapContents();
  }


  private competencyLevel() {
    return this.competency.competencyStatus ? competencyStatus(this.competency.competencyStatus) : '';
  }

  private loadLearningMapContents() {
    const component = this;
    const competencyCode = this.competency.competencyCode;
    searchAPI.fetchLearningMapContents(competencyCode).then((learningMapData) => {
      component.learningMapData = learningMapData;
    });
  }

}

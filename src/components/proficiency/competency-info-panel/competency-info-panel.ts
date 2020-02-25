import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import LearningMap from '@/components/competency/learning-map/learning-map';
import MindsetsPanel from '@/components/proficiency/mindsets-panel/mindsets-panel';
import PortfolioPanel from '@/components/proficiency/portfolio-panel/portfolio-panel';
import PreferencesPanel from '@/components/proficiency/preferences-panel/preferences-panel';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import MetadataPanel from '../metadata-panel/metadata-panel';
import KnowledgePanel from '../knowledge-panel/knowledge-panel';
import CommunityPanel from '../community-panel/community-panel';
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
    'mindsets-panel': MindsetsPanel,
    'metadata-panel': MetadataPanel,
    'knowledge-panel': KnowledgePanel,
    'community-panel': CommunityPanel,
  },
})

export default class CompetencyInfoPanel extends Vue {

  @Prop()
  private competency!: CompetencyModel;

  private activeTab: object = {
    title: 'Knowledge',
    component: 'knowledge-panel',
  };

  @Prop()
  private userId!: string;

  private tabItems = [
    {
      title: 'Knowledge',
      component: 'knowledge-panel',
    },
    {
      title: 'Mindsets',
      component: 'mindsets-panel',
    },
    {
      title: 'Community',
      component: 'community-panel',
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

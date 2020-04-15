import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import KnowledgePanel from '../knowledge-panel/knowledge-panel';
import CommunityPanel from '../community-panel/community-panel';
import {CompetencyModel} from '@/models/proficiency/competency';
import { competencyStatus } from '@/helpers/competency';
import { searchAPI } from '@/providers/apis/search/search';
import moment from 'moment';
import MindsetsPanel from '../mindsets-panel/mindsets-panel';
import { DomainModel } from '@/models/proficiency/domain';
import { SubjectModel } from '@/models/taxonomy/subject';

@Component({
  name: 'competency-info-panel',
  components: {
    'google-material-icon': GoogleMaterialIcon,
    MindsetsPanel,
    KnowledgePanel,
    CommunityPanel,
  },
})

export default class CompetencyInfoPanel extends Vue {

  @Prop()
  public domain!: DomainModel;

  @Prop()
  public subject!: SubjectModel;

  @Prop()
  private competency!: CompetencyModel;

  private activeTab: object = {
    title: 'Knowledge',
    component: KnowledgePanel,
  };

  @Prop()
  private userId!: string;

  private tabItems = [
    {
      title: 'Knowledge',
      component: KnowledgePanel,
    },
    {
      title: 'Mindsets',
      component: MindsetsPanel,
    },
    {
      title: 'Community',
      component: CommunityPanel,
    },
  ];

  @Prop()
  private month!: string;

  @Prop()
  private year!: string;

  private learningMapData?: any = [];

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

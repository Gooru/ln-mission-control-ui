import { Component, Vue, Prop } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import KnowledgePanel from '../knowledge-panel/knowledge-panel';
import CommunityPanel from '../community-panel/community-panel';
import { SubjectModel } from '@/models/taxonomy/subject';
import { ClassificationModel } from '@/models/taxonomy/classification';
import { DomainModel } from '@/models/proficiency/domain';
import moment from 'moment';
import MindsetsListPanel from '../mindsets-list-panel/mindsets-list-panel';

@Component({
  name: 'domain-info-panel',
  components: {
    'google-material-icon': GoogleMaterialIcon,
    MindsetsListPanel,
    KnowledgePanel,
    CommunityPanel,
  },
})
export default class DomainInfoPanel extends Vue {

  @Prop()
  public domain!: DomainModel;

  @Prop()
  public subject!: SubjectModel;

  @Prop()
  public classification!: ClassificationModel;

  @Prop()
  public activeToggleList?: string;

  @Prop()
  public portfolioDomain: any;

  public activeTab: object = {
    title: 'Knowledge',
    component: KnowledgePanel,
  };

  public tabItems = [
    {
      title: 'Knowledge',
      component: KnowledgePanel,
    },
    {
      title: 'Mindsets',
      component: MindsetsListPanel,
    },
    {
      title: 'Community',
      component: CommunityPanel,
    },
  ];

  @Prop()
  private userId!: string;

  @Prop()
  private month!: string;

  @Prop()
  private year!: string;

  public onSelectCompetency(competency: any) {
    this.$emit('onSelectCompetency', competency);
  }
}

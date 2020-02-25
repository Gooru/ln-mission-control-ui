import { Component, Vue, Prop } from 'vue-property-decorator';
import MindsetsPanel from '@/components/proficiency/mindsets-panel/mindsets-panel';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import KnowledgePanel from '../knowledge-panel/knowledge-panel';
import CommunityPanel from '../community-panel/community-panel';
import { SubjectModel } from '@/models/taxonomy/subject';
import { ClassificationModel } from '@/models/taxonomy/classification';
import { DomainModel } from '@/models/proficiency/domain';
import moment from 'moment';

@Component({
  name: 'domain-info-panel',
  components: {
    'google-material-icon': GoogleMaterialIcon,
    MindsetsPanel,
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
      component: MindsetsPanel,
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

import { Component, Vue, Prop } from 'vue-property-decorator';
import MindsetsPanel from '@/components/proficiency/mindsets-panel/mindsets-panel';
import KnowledgePanel from '../knowledge-panel/knowledge-panel';
import CommunityPanel from '../community-panel/community-panel';
import { SubjectModel } from '@/models/taxonomy/subject';
import { ClassificationModel } from '@/models/taxonomy/classification';
import moment from 'moment';

@Component({
  name: 'subject-info-panel',
  components: {
    'mindsets-panel': MindsetsPanel,
    'knowledge-panel': KnowledgePanel,
    'community-panel': CommunityPanel,
  },
})

export default class SubjectInfoPanel extends Vue {

  @Prop()
  public classification!: ClassificationModel;

  @Prop()
  public subject!: SubjectModel;

  public activeTab: object = {
    title: 'Knowledge',
    component: 'knowledge-panel',
  };

  public tabItems = [
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

  @Prop()
  private userId!: string;

  public onSelectDomain(domain: any) {
    this.$emit('onSelectDomain', domain);
  }

  public onSelectCompetency(competency: any) {
    this.$emit('onSelectCompetency', competency);
  }
}

import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import MindsetsPanel from '@/components/proficiency/mindsets-panel/mindsets-panel';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import KnowledgePanel from '../knowledge-panel/knowledge-panel';
import CommunityPanel from '../community-panel/community-panel';
import CompetenciesListPanel from '../competencies-list-panel/competencies-list-panel';
import { SubjectModel } from '@/models/taxonomy/subject';
import { ClassificationModel } from '@/models/taxonomy/classification';
import { DomainModel } from '@/models/proficiency/domain';
import moment from 'moment';

@Component({
  name: 'domain-info-panel',
  components: {
    'google-material-icon': GoogleMaterialIcon,
    'mindsets-panel': MindsetsPanel,
    'knowledge-panel': KnowledgePanel,
    'community-panel': CommunityPanel,
    'competencies-list-panel': CompetenciesListPanel,
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
  private userId!: string;

  @Prop()
  private month!: string;

  @Prop()
  private year!: string;

  public onSelectCompetency(competency: any) {
    this.$emit('onSelectCompetency', competency);
  }
}

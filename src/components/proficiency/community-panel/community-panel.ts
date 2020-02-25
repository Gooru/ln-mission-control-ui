import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import MindsetsListPanel from '../mindsets-list-panel/mindsets-list-panel';
import { SubjectModel } from '@/models/taxonomy/subject';
import { DomainModel } from '@/models/proficiency/domain';
import { CompetencyModel } from '@/models/proficiency/competency';
import { LEARNER_COMMUNITY_VECTORS } from '@/utils/constants';

@Component({
  name: 'community-panel',
  components: {
    'mindsets-list-panel': MindsetsListPanel,
  },
})
export default class CommunityPanel extends Vue {

  public allowedCommunityKeys: any = LEARNER_COMMUNITY_VECTORS;

  @Prop()
  private subject!: SubjectModel;

  @Prop()
  private domain!: DomainModel;

  @Prop()
  private competency!: CompetencyModel;

  @Prop()
  private userId!: string;

  @Prop()
  private month!: string;

  @Prop()
  private year!: string;

  @Prop()
  private activeFacets!: SubjectModel[];

  @Prop()
  private statsBucket!: string;
}

import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ProgressBar from '@/components/charts/progress-bar/progress-bar';
import { SubjectModel } from '@/models/taxonomy/subject';
import { DomainModel } from '@/models/proficiency/domain';
import { LearnerVector } from '@/models/proficiency/learner-vector';
import { learnerAPI } from '@/providers/apis/learner/learner';
import moment from 'moment';

@Component({
  name: 'mindsets-list-panel',
  components: {
    'progress-bar': ProgressBar,
  },
})

export default class MindsetsListPanel extends Vue {

  @Prop()
  public subject!: SubjectModel;

  @Prop()
  private domain!: DomainModel;

  @Prop()
  private statsBucket!: string;

  @Prop()
  private userId!: string;

  @Prop()
  private month: string = moment().format('MM');

  @Prop()
  private year: string = moment().format('YYYY');

  private learnerVectors: LearnerVector[] = [];

  public created() {
    this.loadLearnerVectors();
  }

  public loadLearnerVectors() {
    const component = this;
    const learnerVectors: LearnerVector[] = [];
    const requestParams = component.getVectorReqParams();
    learnerAPI.fetchLearnerVectors(requestParams).then((learnerVectorPoints: LearnerVector[]) => {
        component.learnerVectors = learnerVectorPoints;
    });
  }

  @Watch('month')
  private onChageTimeline() {
    this.loadLearnerVectors();
  }

  private getVectorReqParams() {
    const component = this;
    const requestParams: any = {
      user: component.userId,
      month: Number(component.month),
      year: Number(component.year),
    };
    if (component.statsBucket === 'subject') {
      requestParams.tx_subject_code = component.subject.code;
    } else if (component.statsBucket === 'domain') {
      requestParams.tx_subject_code = component.subject.code;
      requestParams.tx_domain_code = component.domain.domainCode;
    }
    return requestParams;
  }

}

import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ProgressBar from '@/components/charts/progress-bar/progress-bar';
import { SubjectModel } from '@/models/taxonomy/subject';
import { DomainModel } from '@/models/proficiency/domain';
import { LearnerVector } from '@/models/proficiency/learner-vector';
import { learnerAPI } from '@/providers/apis/learner/learner';
import moment from 'moment';
import { LEARNER_MINDSETS_VECTORS } from '@/utils/constants';
import { CompetencyModel } from '@/models/proficiency/competency';

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
  private competency!: CompetencyModel;

  @Prop()
  private domain!: DomainModel;

  @Prop()
  private statsBucket!: string;

  @Prop()
  private userId!: string;

  @Prop()
  private month!: string;

  @Prop()
  private year!: string;

  private learnerVectors: LearnerVector[] | any = [];

  @Prop()
  private allowedVectorKeys!: string[];

  public created() {
    this.loadLearnerVectors();
  }

  public loadLearnerVectors() {
    const component = this;
    const learnerVectors: LearnerVector[] = [];
    const requestParams = component.getVectorReqParams();
    learnerAPI.fetchLearnerVectors(requestParams).then((learnerVectorPoints: LearnerVector[]) => {
        component.learnerVectors = component.extractAllowedVectors(learnerVectorPoints);
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
    } else if (component.statsBucket === 'competency') {
      requestParams.tx_subject_code = component.subject.code;
      requestParams.tx_domain_code = component.domain.domainCode;
      requestParams.tx_competency_code = component.competency.competencyCode;
    }
    return requestParams;
  }

  private extractAllowedVectors(learnerVectorPoints: LearnerVector[]) {
    return this.allowedVectorKeys.map( (vectorKey: string) => {
      return learnerVectorPoints.find( (learnerVectorPoint: LearnerVector) => vectorKey === learnerVectorPoint.label);
    });
  }

}

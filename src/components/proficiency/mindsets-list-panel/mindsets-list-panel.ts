import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ProgressBar from '@/components/charts/progress-bar/progress-bar';
import { SubjectModel } from '@/models/taxonomy/subject';
import { LearnerVectorModel } from '@/models/proficiency/learner-vector';

@Component({
  name: 'mindsets-list-panel',
  components: {
    'progress-bar': ProgressBar,
  },
})

export default class MindsetsListPanel extends Vue {

  @Prop()
  public subject!: SubjectModel;

  private learnerVectors!: LearnerVectorModel[];

  @Prop()
  private mindsets = [
    {
      label: 'Authority',
      value: 0.9,
    },
    {
      label: 'Citizenship',
      value: 0.9,
    },
    {
      label: 'Reputation',
      value: 0.8,
    },
    {
      label: 'Grit',
      value: 0.7,
    },
    {
      label: 'Perseverance',
      value: 0.9,
    },
    {
      label: 'Motivation',
      value: 0.4,
    },
    {
      label: 'Self-Confidence',
      value: 0.8,
    },
  ];

  public created() {
    this.loadLearnerVectors();
  }

  public loadLearnerVectors() {
    const component = this;
    const learnerVectors: LearnerVectorModel[] = [];
    const payload: any = {
                      authority: 0.9,
                      citizenship: 0.9,
                      reputation: 0.8,
                      grit: 0.7,
                      perseverance: 0.9,
                      motivation: 0.4,
                      selfConfidence: 0.8,
                    };
    const vectorItems = Object.keys(payload);
    vectorItems.map((vectorItem: string) => {
      learnerVectors.push({
        label: vectorItem,
        value: payload[vectorItem],
      });
    });
    component.learnerVectors = learnerVectors;
  }

}

import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import StepProgressBar from '@/components/charts/step-progress-bar/step-progress-bar';
import { SubjectModel } from '@/models/taxonomy/subject';
import { LearnerPreference } from '@/models/proficiency/learner-preference';
import McIcon from '@/components/icons/mc-icon/mc-icon';
import { learnerAPI } from '@/providers/apis/learner/learner';
import { LEARNER_PREFERENCE_META } from '@/utils/constants';
import moment from 'moment';

@Component({
  name: 'preferences-panel',
  components: {
    'step-progress-bar': StepProgressBar,
    'mc-icon': McIcon,
  },
})

export default class PreferencesPanel extends Vue {

  @Prop()
  private subject!: SubjectModel;

  @Prop()
  private learnerPreferences: LearnerPreference[] = [];

  @Prop()
  private userId!: string;

  @Prop()
  private month!: string;

  @Prop()
  private year!: string;

  public created() {
    this.loadPreferenceData();
  }

  public loadPreferenceData() {
    const component = this;
    const requestParams = component.getRequestParams();
    const learnerPreferences: LearnerPreference[] = [];
    learnerAPI.fetchLearnerPreferences(requestParams).then((preferences: LearnerPreference[]) => {
      preferences.map( (preference: LearnerPreference) => {
        learnerPreferences.push({
          label: LEARNER_PREFERENCE_META[preference.label].labelKey,
          icon: LEARNER_PREFERENCE_META[preference.label].icon,
          value: preference.value,
        });
      });
      component.learnerPreferences = learnerPreferences;
    });
  }

  @Watch('month')
  private onChageTimeline() {
    this.loadPreferenceData();
  }

  private getRequestParams() {
    const component = this;
    const requestParams = {
      user: component.userId,
      month: Number(component.month),
      year: Number(component.year),
    };
    return requestParams;
  }

}

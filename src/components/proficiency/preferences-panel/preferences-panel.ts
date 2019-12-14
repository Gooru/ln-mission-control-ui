import { Component, Vue, Prop } from 'vue-property-decorator';
import StepProgressBar from '@/components/charts/step-progress-bar/step-progress-bar';
import { SubjectModel } from '@/models/taxonomy/subject';
import { LearnerPreference } from '@/models/proficiency/learner-preference';
import McIcon from '@/components/icons/mc-icon/mc-icon';
import { learnerAPI } from '@/providers/apis/learner/learner';
import { LEARNER_PREFERENCE_META } from '@/utils/constants';

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

  private userId: string = '5a43c256-6b9f-4543-9fbb-b5e32864d2c6';

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

  private getRequestParams() {
    const requestParams = {
      user: this.userId,
    };
    return requestParams;
  }

}

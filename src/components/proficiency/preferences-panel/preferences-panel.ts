import { Component, Vue, Prop } from 'vue-property-decorator';
import StepProgressBar from '@/components/charts/step-progress-bar/step-progress-bar';
import { SubjectModel } from '@/models/taxonomy/subject';
import { PreferenceModel } from '@/models/proficiency/preference';
import McIcon from '@/components/icons/mc-icon/mc-icon';

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
  private preferenceItems!: PreferenceModel[];

  @Prop()
  private preferenceDataValues: any = {
    video_pref: {
      label: 'Video Resources',
      icon: 'video-resource',
    },
    webpage_pref: {
      label: 'Web Based Resources',
      icon: 'website-resource',
    },
    interactive_pref: {
      label: 'Interactive Resources',
      icon: 'interactive-resource',
    },
    image_pref: {
      label: 'Image Resources',
      icon: 'image-resource',
    },
    text_pref: {
      label: 'Text Resources',
      icon: 'text-resource',
    },
    audio_pref: {
      label: 'Audio Resources',
      icon: 'audio-resource',
    },
  };

  public created() {
    this.loadPreferenceData();
  }

  public loadPreferenceData() {
    const component = this;
    const payload: any = {
                  video_pref: 0.8,
                  webpage_pref: 0.4,
                  interactive_pref: 0.7,
                  image_pref: 0.8,
                  text_pref: 0.4,
                  audio_pref: 0.9,
                };
    const preferenceDataValues = component.preferenceDataValues;
    const preferenceItems: PreferenceModel[] = [];
    const preferenceKeys = Object.keys(payload);
    preferenceKeys.map( (preferenceKey: string) => {
      const preferenceDataValue = preferenceDataValues[preferenceKey];
      preferenceItems.push({
          label: preferenceDataValue.label,
          value: payload[preferenceKey],
          icon: preferenceDataValue.icon,
        });
    });
    component.preferenceItems = preferenceItems;

  }

}

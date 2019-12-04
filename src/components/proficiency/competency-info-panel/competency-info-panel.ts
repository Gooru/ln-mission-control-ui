import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import LearningMap from '@/components/competency/learning-map/learning-map';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
  name: 'competency-info-panel',
  components: {
    'learning-map': LearningMap,
    'google-material-icon': GoogleMaterialIcon,
  },
})

export default class CompetencyInfoPanel extends Vue {

  @Prop()
  public competency!: any;
}

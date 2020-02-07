import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
  name: 'grade-level-card',
  components: {
    'material-icon': GoogleMaterialIcon,
  },
})

export default class GradeLevelCard extends Vue {
  // ----------------------------------------------------------
  // Properties
  @Prop()
  private gradeCompetency: any;

  @Prop()
  private activeGrade: any;

  // ------------------------------------------------------------
  // Action

  private onClose() {
    this.$emit('onClose');
  }

  get firstGrade() {
    return this.activeGrade.length ? this.activeGrade[0] : '';
  }

  get lastGrade() {
    return this.activeGrade.length > 1 ? this.activeGrade[this.activeGrade.length - 1] : '';
  }
}

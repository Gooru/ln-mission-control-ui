import { Vue, Component, Prop } from 'vue-property-decorator';
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
  private gradeDetails?: any;
}

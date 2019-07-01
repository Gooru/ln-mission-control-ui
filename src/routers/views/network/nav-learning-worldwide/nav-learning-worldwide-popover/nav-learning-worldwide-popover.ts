import { Component, Vue, Prop } from 'vue-property-decorator';
import { numberFormat } from '@/helpers/number-format';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import FontAwesomeIcon from '@/components/icons/font-awesome-icon/font-awesome-icon';


@Component({
  name: 'nav-learning-worldwide-popover',
  components: {
    'google-material-icon': GoogleMaterialIcon,
    'font-awesome-icon': FontAwesomeIcon,
  },
})
export default class NavLearningWorldWidePopover extends Vue {

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Default style name of font awesome icon.
   */
  @Prop()
  private country!: any;

  // -------------------------------------------------------------------------
  // Methods

  private numberFormat(value: number) {
    return numberFormat(value);
  }

}

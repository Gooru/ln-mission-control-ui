import { Component, Vue, Prop } from 'vue-property-decorator';
import { numberFormatWithTextSuffix } from '@/helpers/number-format';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import FontAwesomeIcon from '@/components/icons/font-awesome-icon/font-awesome-icon';
import McIcon from '@/components/icons/mc-icon/mc-icon';


@Component({
  name: 'nav-learning-worldwide-popover',
  components: {
    'google-material-icon': GoogleMaterialIcon,
    'font-awesome-icon': FontAwesomeIcon,
    'mc-icon': McIcon,
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
    return numberFormatWithTextSuffix(value);
  }

}

import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({ name: 'google-material-icon' })
export default class GoogleMaterialIcon extends Vue {

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Default style name of google material icon.
   */
  @Prop()
  private iconStyle!: string;

  /**
   * Maintains the icon  name of google material icon.
   * @type {string}
   */
  @Prop()
  private icon!: string;

  // -------------------------------------------------------------------------
  // Computed Properties

  get styleName() {
    return this.iconStyle ? this.iconStyle : 'material-icons';
  }


}

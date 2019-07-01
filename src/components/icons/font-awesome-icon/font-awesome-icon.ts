import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({ name: 'font-awesome-icon' })
export default class FontAwesomeIcon extends Vue {

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Default style name of font awesome icon.
   */
  @Prop()
  private iconStyle!: string;

  /**
   * Maintains the  icon name of font awesome icon.
   * @type {string}
   */
  @Prop()
  private icon!: string;

  // -------------------------------------------------------------------------
  // Computed Properties

  get styleName() {
    return this.iconStyle ? this.iconStyle : 'fa';
  }

}

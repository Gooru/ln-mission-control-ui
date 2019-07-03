import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({ name: 'mc-icon' })
export default class MCIcon extends Vue {

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Default style name of misson control icon.
   */
  private iconStyle: string = 'mc-icon';

  /**
   * Maintains the icon name of misson control icon.
   * @type {string}
   */
  @Prop()
  private icon!: string;

}

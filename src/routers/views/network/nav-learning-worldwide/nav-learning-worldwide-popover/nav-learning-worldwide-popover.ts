import { Component, Vue, Prop } from 'vue-property-decorator';
import { numberFormat } from '@/helpers/number-format';

@Component({
  name: 'nav-learning-worldwide-popover',
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

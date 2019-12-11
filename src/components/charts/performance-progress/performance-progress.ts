import { Component, Vue, Prop} from 'vue-property-decorator';

@Component({
  name: 'performance-progress',
})
export default class PerformanceProgress extends Vue {
  @Prop()
  private totalWidth?: string;
  @Prop()
  private color?: string;
  @Prop()
  private isEnbleHover?: boolean;


  // -------------------------------------------------------------
  // Actions

  private onShowMessage(event: any, index: any) {
    this.$emit('onShowMessage', event, index);
  }

  private onHideMessage() {
    this.$emit('onHideMessage');
  }

}

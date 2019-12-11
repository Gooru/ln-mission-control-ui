import { Component, Vue, Prop} from 'vue-property-decorator';

@Component({
  name: 'performance-progress',
})
export default class PerformanceProgress extends Vue {
  @Prop()
  private totalWidth?: string;
  @Prop()
  private color?: string;
}

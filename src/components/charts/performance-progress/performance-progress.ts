import { Component, Vue, Prop} from 'vue-property-decorator';

@Component({
  name: 'performance-progress',
})
export default class PerformanceProgress extends Vue {
  @Prop()
  private progressWidth?: string;
  @Prop()
  private progressWidth1?: string;
  @Prop()
  private backgroundColor?: string;
  @Prop()
  private backgroundColor1?: string;

}

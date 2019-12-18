import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'progress-bar',
})
export default class ProgressBar extends Vue {

  @Prop()
  private label!: string;

  @Prop()
  private fillValue!: string;

  get fillPercentage() {
    return +this.fillValue * 100;
  }
}

import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'step-progress-bar',
})

export default class StepProgressBar extends Vue {

  @Prop()
  private fillLevel!: string;

  get fillPercentage() {
    return +this.fillLevel * 100;
  }
  get connectors() {
    const connectors = [];
    for (let connectingPos = 0; connectingPos <= 10; connectingPos++) {
      connectors[connectingPos] = connectingPos * 10 - 1.5;
    }
    connectors[0] = 0;
    return connectors;
  }
}

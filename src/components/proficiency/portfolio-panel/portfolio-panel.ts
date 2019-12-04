import { Component, Vue, Prop } from 'vue-property-decorator';
import { SubjectModel } from '@/models/taxonomy/subject';

@Component({
  name: 'portfolio-panel',
})

export default class PortfolioPanel extends Vue {

  @Prop()
  public subject!: SubjectModel;
}

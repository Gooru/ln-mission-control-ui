import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { SubjectModel } from '@/models/taxonomy/subject';

@Component({
  name: 'mindsets-list-panel',
})

export default class MindsetsListPanel extends Vue {

  @Prop()
  public subject!: SubjectModel;

}

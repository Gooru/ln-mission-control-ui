import { Component, Vue, Prop } from 'vue-property-decorator';
import { SubjectModel } from '@/models/taxonomy/subject';

@Component({
  name: 'preferences-panel',
})

export default class PreferencesPanel extends Vue {

  @Prop()
  public subject!: SubjectModel;
}

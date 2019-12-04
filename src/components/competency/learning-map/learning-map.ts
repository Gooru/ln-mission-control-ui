import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { searchAPI } from '@/providers/apis/search/search';

@Component({
  name: 'learning-map',
})

export default class LearningMap extends Vue {

  @Prop()
  public competencyCode!: string;

  public created() {
    this.loadLearningMapContents();
  }

  public loadLearningMapContents() {
    const competencyCode = this.competencyCode;
    searchAPI.fetchLearningMapContents(competencyCode);
  }
}

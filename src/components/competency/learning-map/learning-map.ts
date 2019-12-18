import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import MCIcon from '@/components/icons/mc-icon/mc-icon';
import { searchAPI } from '@/providers/apis/search/search';
import { CompetencyModel } from '@/models/proficiency/competency';
import { LEARNING_MAP_CONTENT_TYPE } from '@/utils/constants';

@Component({
  name: 'learning-map',
  components: {
    'mc-icon': MCIcon,
  },
})

export default class LearningMap extends Vue {

  get signatureAssessments() {
    return this.learningMapData.signatureAssessments || [];
  }

  get signatureCollections() {
    return this.learningMapData.signatureCollections || [];
  }

  @Prop()
  public competency!: string;

  @Prop()
  private userId!: string;

  @Prop()
  private learningMapData!: any;

  private contentWiseCount!: any;

  private created() {
    this.parseLearningMapData();
  }

  private parseLearningMapData() {
    const component = this;
    const learningMapData = component.learningMapData;
    const contentWiseCount: any = [];
    const learningMapContents = learningMapData ? learningMapData.contents : {};
    LEARNING_MAP_CONTENT_TYPE.map( (contentType: any) => {
      contentWiseCount.push({
        count: learningMapContents[contentType.type] ? learningMapContents[contentType.type].length : 0,
        type: contentType.type,
        icon: `${contentType.type}-gray`,
        label: contentType.labelKey,
      });
    });
    component.contentWiseCount = contentWiseCount;
  }
}

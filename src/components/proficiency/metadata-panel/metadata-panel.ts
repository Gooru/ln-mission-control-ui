import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { MICRO_COMPETENCY_CODE_TYPES, GOORU_DEFAULT_FRAMEWORK } from '@/utils/constants';
import { CompetencyPrerequisite } from '@/models/proficiency/competency-prerequisite';
import {CompetencyModel} from '@/models/proficiency/competency';
import { TaxonomyCode } from '@/models/taxonomy/code';
import {taxonomyAPI} from '@/providers/apis/taxonomy/taxonomy';
import { getSubjectId, getDomainId, getCourseId } from '@/utils/taxonomy';

@Component({
  name: 'metadata-panel',
  components: {
  },
})

export default class MetadataPanel extends Vue {

  @Prop()
  private learningMapData!: any;

  private prerequisites: CompetencyPrerequisite[] = this.learningMapData.prerequisites;

  @Prop()
  private competency!: CompetencyModel;

  private competencyCode: string = this.competency.competencyCode;

  private microCompetencies: any = [];

  public created() {
    this.fetchTaxonomyCodes();
  }

  public fetchTaxonomyCodes() {
    const subjectId = getSubjectId(this.competencyCode);
    const courseId = getCourseId(this.competencyCode);
    const domainId = getDomainId(this.competencyCode);
    taxonomyAPI.fetchTaxonomyCodes(
      GOORU_DEFAULT_FRAMEWORK,
      subjectId,
      courseId,
      domainId).then((taxonomyCodes: TaxonomyCode[]) => {
      this.microCompetencies = this.getMicroCompetencies(taxonomyCodes);
    });
  }

  /**
   * @function getMicroCompetencies
   * Method to get micro competencies
   */
  public getMicroCompetencies(taxonomyCodes: TaxonomyCode[]) {
    const component = this;
    const standardCode = this.competency.competencyCode;
    const regex = new RegExp(standardCode);
    const microCompetencies = taxonomyCodes.filter((code: TaxonomyCode) => {
      return (
        regex.test(code.id) &&
        MICRO_COMPETENCY_CODE_TYPES.includes(code.code_type)
      );
    });
    return microCompetencies;
  }
}

import { SubjectModel } from '@/models/taxonomy/subject';
import { ClassificationModel } from '@/models/taxonomy/classification';
import { MicroCompetencyModel } from '@/models/content/micro-competency';
import { TaxonomyCode } from '@/models/taxonomy/code';

export class TaxonomySerializer {

  private static INSTANCE = new TaxonomySerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public serializeTaxonomyClassifications(taxonomyClassifications: any) {
    return taxonomyClassifications ? taxonomyClassifications.subject_classifications : [];
  }

  public serializeTaxonomySubjects(taxonomySubjects: any) {
    return taxonomySubjects ? taxonomySubjects.subjects : [];
  }

  public serializeTaxonomyCourse(taxonomySubjects: any) {
    return taxonomySubjects ? taxonomySubjects.courses : [];
  }

  public serializeTaxonomyGrades(taxonomyGrades: any) {
    return taxonomyGrades ? taxonomyGrades.grades : [];
  }

  public serializeTaxonomyGradeBoundaries(gradeBoundaries: any) {
    return gradeBoundaries ? gradeBoundaries.domains : [];
  }

  public normalizefetchCode(payload: any): MicroCompetencyModel[] {
    const result: MicroCompetencyModel[] = [];
    if (payload.codes) {
      payload.codes.map((codes: any) => {
        result.push({
          id: codes.id,
          code: codes.code,
          codeType: codes.code_type,
          isSelectable: codes.is_selectable,
          sequenceId: codes.sequence_id,
          title: codes.title,
        });
      });
    }
    return result;
  }

  public serializeTaxonomyCodes(payload: any): TaxonomyCode[] {
    const taxonomyCodes = payload.codes || [];
    const serializedTaxonomyCodes: TaxonomyCode[] = taxonomyCodes.map( (taxonomyCode: TaxonomyCode) => {
      const serializedTaxonomyCode: TaxonomyCode = {
        code: taxonomyCode.code,
        code_type: taxonomyCode.code_type,
        id: taxonomyCode.id,
        is_selectable: taxonomyCode.is_selectable,
        parent_taxonomy_code_id: taxonomyCode.parent_taxonomy_code_id,
        sequence_id: taxonomyCode.sequence_id,
        title: taxonomyCode.title,
      };
      return serializedTaxonomyCode;
    });
    return serializedTaxonomyCodes;
  }
}

export const taxonomySerializer = TaxonomySerializer.instance;

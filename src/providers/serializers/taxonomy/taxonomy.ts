import { SubjectModel } from '@/models/taxonomy/subject';
import { ClassificationModel } from '@/models/taxonomy/classification';
import { MicroCompetencyModel } from '@/models/content/micro-competency';

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

}

export const taxonomySerializer = TaxonomySerializer.instance;

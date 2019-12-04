import {SubjectModel} from '@/models/taxonomy/subject';
import {ClassificationModel} from '@/models/taxonomy/classification';

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
}

export const taxonomySerializer = TaxonomySerializer.instance;

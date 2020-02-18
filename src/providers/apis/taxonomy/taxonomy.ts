import { http } from '@/providers/apis/http';
import { taxonomySerializer } from '@/providers/serializers/taxonomy/taxonomy';
import { SubjectModel } from '@/models/taxonomy/subject';
import { ClassificationModel } from '@/models/taxonomy/classification';
import { GradeModel } from '@/models/taxonomy/grade';
import { GradeBoundaryModel } from '@/models/taxonomy/grade-boundary';
import { TaxonomyCode } from '@/models/taxonomy/code';

export class TaxonomyAPI {

  private static INSTANCE = new TaxonomyAPI();

  private namespace = 'api/nucleus/v2/taxonomy';

  private taxonomyNamespace = 'api/nucleus/v1/taxonomy';

  private dsNamespace = 'api/ds/users/v2/tx';

  private namespace1 = 'api/nucleus/v1/taxonomy';

  static get instance() {
    return this.INSTANCE;
  }

  public fetchTaxonomyClassifications(): Promise<ClassificationModel[]> {
    const endpoint = `${this.namespace}/classifications`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers).then((response) => {
      return taxonomySerializer.serializeTaxonomyClassifications(response.data);
    });
  }

  public fetchTaxonomySubjects(category: string): Promise<SubjectModel[]> {
    const endpoint = `${this.dsNamespace}/subjects`;
    const headers = http.getTokenHeaders();
    const data = {
      classificationType: category,
    };
    return http.get(endpoint, headers, data).then((response) => {
      return taxonomySerializer.serializeTaxonomySubjects(response.data);
    });
  }

  public fetchTaxonomyGrades(subject: string, framework?: any): Promise<GradeModel[]> {
    const endpoint = `${this.dsNamespace}/grades`;
    const headers = http.getTokenHeaders();
    const data = {
      subject,
      framework,
    };
    return http.get(endpoint, headers, data).then((response) => {
      return taxonomySerializer.serializeTaxonomyGrades(response.data);
    });
  }

  public fetchTaxonomyGradeBoundaries(gradeId: number | any): Promise<GradeBoundaryModel[]> {
    const endpoint = `${this.dsNamespace}/grade/boundary/${gradeId}`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers).then((response) => {
      return taxonomySerializer.serializeTaxonomyGradeBoundaries(response.data);
    });
  }

  public fetchTaxonomyCodes(
    frameworkId: string,
    subjectId: string,
    courseId: string,
    domainId: string): Promise<TaxonomyCode[]> {
    const endpoint = `${this.taxonomyNamespace}/frameworks/${frameworkId}/subjects/${
      subjectId}/courses/${courseId}/domains/${domainId}/codes`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers).then((response) => {
      return taxonomySerializer.serializeTaxonomyCodes(response.data);

    });
  }

  public fetchCodes(frameworkId: any, subjectId: any, courseId: any, domainId: any): Promise<any> {
    const namespace = this.namespace1;
    const endpoint = `${namespace}/frameworks/${frameworkId}/subjects/${
      subjectId}/courses/${courseId}/domains/${domainId}/codes`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers).then((response) => {
      return taxonomySerializer.normalizefetchCode(response.data);
    });
  }
}

export const taxonomyAPI = TaxonomyAPI.instance;

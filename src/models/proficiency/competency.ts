export interface CompetencyModel {
  competencyCode: string;
  competencyDesc: string;
  competencyName: string;
  competencySeq: number;
  competencyStudentDesc: string;
  status: number;
  competencyStatus?: number;
  domainCode?: string;
  domainName?: string;
}

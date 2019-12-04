import { CompetencyModel } from './competency';

export interface DomainModel {
  domainName: string;
  domainSeq: number;
  domainCode: string;
  competencies: CompetencyModel[];
}

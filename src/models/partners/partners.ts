import { PartnerModel } from './partner';
import { OverallStatsModel } from './overall-stats';
export interface PartnersModel {
  funders: PartnerModel[];
  researchers: PartnerModel[];
  content_developers: PartnerModel[];
  implementation_partners: PartnerModel[];
  tools_providers: PartnerModel[];
  integration_partners: PartnerModel[];
  administrators: PartnerModel[];
  learners: PartnerModel[];
  overall_stats: OverallStatsModel;
  [key: string]: any;
}

import { PartnerModel } from './partner';

export interface PartnersModel {
  funders: PartnerModel[];
  researchers: PartnerModel[];
  content_developers: PartnerModel[];
  implementation_partners: PartnerModel[];
  tools_providers: PartnerModel[];
  integration_partners: PartnerModel[];
  administrators: PartnerModel[];
  learners: PartnerModel[];
  [key: string]: PartnerModel[];
}

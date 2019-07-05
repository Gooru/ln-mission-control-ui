import { PartnerModel } from './partner';

export interface PartnersModel {
  funders: PartnerModel[];
  researchers: PartnerModel[];
  content_development: PartnerModel[];
  implementation: PartnerModel[];
  tools_provider: PartnerModel[];
  integration: PartnerModel[];
  tenant_administrators: PartnerModel[];
  learners: PartnerModel[];
}

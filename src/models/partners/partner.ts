import { CountryModel } from './country';


export interface PartnerModel {
  partner_id: number;
  partner_name: string;
  logo?: string;
  total_users: number;
  tenant_manager?: boolean;
  total_students?: number;
  total_classes?: number;
  total_others?: number;
  total_teachers?: number;
  countries: CountryModel[];
  website?: string;
}

import { CountryModel } from './country';
import { Categories } from './category';
import { Subjects } from './subjects';
import { ContentType } from './content-type';
import { States } from './states';
import { ContentDistribution } from './content-distribution';



export interface PartnerModel {
  partner_id: number;
  partner_name: string;
  logo?: string;
  total_users: number;
  tenant_manager?: boolean;
  total_students: number;
  total_classes?: number;
  total_others?: number;
  total_teachers: number;
  total_competencies_gained?: number;
  countries: CountryModel[];
  website?: string;
  images?: string;
  videos?: string;
  partner_type?: string;
  intro?: string;
  category_distribution?: Categories[];
  subject_distribution?: Subjects[];
  content_type_stats?: ContentType[];
  states?: States[];
  content_type_distribution?: ContentDistribution[];

}

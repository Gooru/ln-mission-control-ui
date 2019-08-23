import { CountryModel } from './country';
import { CategoryModel } from './category';
import { SubjectModel } from './subjects';
import { ContentTypeModel } from './content-type';
import { StateModel } from './states';



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
  category_distribution?: CategoryModel[];
  subject_distribution?: SubjectModel[];
  content_type_stats?: ContentTypeModel[];
  states?: StateModel[];
  content_type_distribution?: ContentTypeModel[];

}

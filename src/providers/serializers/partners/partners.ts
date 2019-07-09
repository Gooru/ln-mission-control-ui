import { PartnerModel } from '@/models/partners/partner';
import { PartnersModel } from '@/models/partners/partners';
import { CountryModel } from '@/models/partners/country';
import { DEFAULT_IMAGES_PATH } from '@/utils/constants';


/**
 *
 * This Partners serializer is responsible for converting the Raw format to model.
 *
 */
export class PartnersSerializer {
  private static INSTANCE = new PartnersSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public partnerModelSerializer(res: any): PartnerModel {
    const result: PartnerModel = {
      partner_id: res.partner_id,
      partner_name: res.partner_name,
      tenant_manager: res.tenant_manager,
      total_users: res.total_users,
      logo: res.logo ? res.logo : DEFAULT_IMAGES_PATH.partner,
      total_classes: res.total_classes,
      total_others: res.total_others,
      total_students: res.total_students,
      total_teachers: res.total_teachers,
      countries: this.countriesModelSerializer(res.countries),
    };
    return result;
  }

  public partnersModelSerializer(res: any): PartnersModel {
    const result: PartnersModel = {
      funders: this.partnerListModelSerializer(res.researchers),
      integration_partners: this.partnerListModelSerializer(res.integration_partners),
      researchers: this.partnerListModelSerializer(res.researchers),
      content_developers: this.partnerListModelSerializer(res.content_developers),
      tools_providers: this.partnerListModelSerializer(res.tools_providers),
      administrators: this.partnerListModelSerializer(res.administrators),
      implementation_partners: this.partnerListModelSerializer(res.implementation_partners),
      learners: this.partnerListModelSerializer(res.researchers),
    };
    return result;
  }

  public partnerListModelSerializer(res: any): PartnerModel[] {
    const resultSet: PartnerModel[] = new Array();
    res.map((partner: object) => {
      resultSet.push(this.partnerModelSerializer(partner));
    });
    return resultSet;
  }

  private countriesModelSerializer(res: any): CountryModel[] {
    const resultSet: CountryModel[] = new Array();
    if (res) {
      res.map((country: object) => {
        resultSet.push(this.countryModelSerializer(country));
      });
    }
    return resultSet;
  }

  private countryModelSerializer(res: any): CountryModel {
    const result: CountryModel = {
      id: res.id,
      name: res.name,
      code: res.code,
    };
    return result;
  }


}

export const partnersSerializer = PartnersSerializer.instance;

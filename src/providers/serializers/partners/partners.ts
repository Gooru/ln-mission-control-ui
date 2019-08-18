import { PartnerModel } from '@/models/partners/partner';
import { PartnersModel } from '@/models/partners/partners';
import { CountryModel } from '@/models/partners/country';
import { DEFAULT_IMAGES_PATH } from '@/utils/constants';
import { OverallStatsModel } from '@/models/partners/overall-stats';
import { Subjects } from '@/models/partners/subjects';
import { Categories } from '@/models/partners/category';
import { States } from '@/models/partners/states';
import { ContentType } from '@/models/partners/content-type';

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
      intro: res.intro,
      partner_type: res.partner_type,
      countries: this.countriesModelSerializer(res.countries),
      subjects_usage: this.subjectsModelSerializer(res.subjects_usage),
      categories_usage: this.categoriesModelSerializer(res.categories_usage),
      states: this.statesModelSerializer(res.states),
      content_types_usage: this.contentTypesModelSerializer(res.content_types_usage),
    };
    return result;
  }

  public partnersModelSerializer(res: any): PartnersModel {
    const result: PartnersModel = {
      funders: this.partnerListModelSerializer(res.funders),
      integration_partners: this.partnerListModelSerializer(res.integration_partners),
      researchers: this.partnerListModelSerializer(res.researchers),
      content_developers: this.partnerListModelSerializer(res.content_developers),
      tools_providers: this.partnerListModelSerializer(res.tools_providers),
      administrators: this.partnerListModelSerializer(res.implementation_partners),
      implementation_partners: this.partnerListModelSerializer(res.implementation_partners),
      learners: this.partnerListModelSerializer(res.learners),
      overall_stats: this.overallStatsModelSerializer(res.overall_stats),
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

  private subjectModelSerializer(res: any): Subjects {
    const result: Subjects = {
      code: res.id,
      name: res.name,
      total_count: res.total_count,
    };
    return result;
  }

  private subjectsModelSerializer(res: any): Subjects[] {
    const resultSet: Subjects[] = new Array();
    if ( res ) {
      res.map((subject: object) => {
        resultSet.push(this.subjectModelSerializer(subject));
      });
    }
    return resultSet;
  }

  private categoryModelSerializer(res: any): Categories {
    const result: Categories = {
      code: res.code,
      name: res.name,
      total_count: res.total_count,
    };
    return result;
  }

  private categoriesModelSerializer(res: any): Categories[] {
    const resultSet: Categories[] = new Array();
    if (res) {
      res.map((category: object) => {
        resultSet.push(this.categoryModelSerializer(category));
      });
    }
    return resultSet;
  }

  private stateModelSerializer(res: any): States {
    const result: States = {
      id: res.id,
      code: res.code,
      country_code: res.country_code,
      name: res.name,
    };
    return result;
  }

  private statesModelSerializer(res: any): States[] {
    const resultSet: States[] = new Array();
    if (res) {
      res.map((states: object) => {
        resultSet.push(this.stateModelSerializer(states));
      });
    }
    return resultSet;
  }
  private contentTypeModelSerializer(res: any): ContentType {
    const result: ContentType = {
      name: res.name,
      total_count: res.total_count,
    };
    return result;
  }

  private contentTypesModelSerializer(res: any): ContentType[] {
    const resultSet: ContentType[] = new Array();
    if (res) {
      res.map((content: object) => {
        resultSet.push(this.contentTypeModelSerializer(content));
      });
    }
    return resultSet;
  }

  private overallStatsModelSerializer(res: any): OverallStatsModel {
    const result: OverallStatsModel = {
      total_partners: res.total_partners,
      total_countries: res.total_countries,
      total_users: res.total_users,
    };
    return result;
  }



}

export const partnersSerializer = PartnersSerializer.instance;

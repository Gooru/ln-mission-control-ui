import { CountryModel } from '@/models/stats/country';

/**
 *
 * This Stats serializer is responsible for converting the Raw format to model.
 *
 */
export class StatsSerializer {
  private static INSTANCE = new StatsSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public countriesModelSerializer(res: any): CountryModel[] {
    const resultSet: CountryModel[] = new Array();
    res.countries.map((country: object) => {
      resultSet.push(this.countryModelSerializer(country));
    });
    return resultSet;
  }

  private countryModelSerializer(res: any): CountryModel {
    const result: CountryModel = {
      id: res.id,
      country_code: res.country_code,
      country_name: res.country_name,
      total_teachers: res.total_teachers,
      total_students: res.total_students,
      total_others: res.total_others,
      total_users: res.total_users,
      total_classes: res.total_classes,
      total_competencies_gained: res.total_competencies_gained,
      total_timespent: res.total_timespent,
      total_activities_conducted: res.total_activities_conducted,
      total_navigator_courses: res.total_navigator_courses,
    };
    return result;
  }
}

export const statsSerializer = StatsSerializer.instance;

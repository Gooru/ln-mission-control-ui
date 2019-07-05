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
      country_code: res.country_code,
      country_name: res.country_name,
      total_teacher: res.total_teacher,
      total_student: res.total_student,
      total_other: res.total_other,
      active_student: res.active_student,
      active_classroom: res.active_classroom,
      competencies_gained: res.competencies_gained,
      total_timespent: res.total_timespent,
      activities_conducted: res.activities_conducted,
      navigator_courses: res.navigator_courses,
    };
    return result;
  }
}

export const statsSerializer = StatsSerializer.instance;

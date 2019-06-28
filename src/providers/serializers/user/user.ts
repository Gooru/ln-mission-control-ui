import { UserDistributionByGeoLocationModel } from '@/models/user/user-distribution-by-geolocation';

/**
 *
 * This User serializer is responsible for converting the Raw format to model.
 *
 */
export class UserSerializer {
  private static INSTANCE = new UserSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public usersDistributionByGeoLocationModelSerializer(res: any) {
    const resultSet: UserDistributionByGeoLocationModel[] = new Array();
    if (res.geoLocations) {
      res.geoLocations.map((geoLocation: object) => {
        resultSet.push(this.userDistributionByGeoLocationModelSerializer(geoLocation));
      });
    }
    return resultSet;
  }

  private userDistributionByGeoLocationModelSerializer(res: any) {
    const result: UserDistributionByGeoLocationModel = {
      code: res.code,
      name: res.name,
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

export const userSerializer = UserSerializer.instance;

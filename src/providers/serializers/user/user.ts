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
      student_total: res.student_total,
      teacher_total: res.teacher_total,
      active: res.active,
    };
    return result;
  }
}

export const userSerializer = UserSerializer.instance;

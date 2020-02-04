import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { mapDataSetAPI } from '@/providers/apis/app/map-dataset';
import { statsAPI } from '@/providers/apis/stats/stats';
import NavLearningWorldWide from './nav-learning-worldwide/nav-learning-worldwide';
import Partners from './partners/partners';
import { CountryModel } from '@/models/stats/country';
import { drillDownAPI } from '@/providers/apis/drill-down/drill-down';
import { sessionService } from '@/providers/services/auth/session';
import { appConfigService } from '@/providers/services/app/app-config';


@Component({
  components: {
    'nav-learning-worldwide': NavLearningWorldWide,
    'partners': Partners,
  },
})
export default class Network extends Vue {

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Maintains the data of map plotting values
   * @type {Object}
   */
  private mapData: any = null;

  get session() {
    return sessionService.getSession();
  }

  get isTenant() {
    if (this.session && this.session.tenant) {
      return appConfigService.getClientId() === this.session.tenant.tenant_id;
    }
    return false;
  }



  // -------------------------------------------------------------------------
  // Hooks

  private created() {
    const worldMapDataSet = this.fetchNavWorldWideMapData();
    worldMapDataSet.then((data) => {
      this.mapData = data;
    });
  }

  // -------------------------------------------------------------------------
  // Methods

  private fetchNavWorldWideMapData() {
    const overallStats = {
      totalStudentsCount: 0,
      totalTeachersCount: 0,
      totalOthersCount: 0,
    };
    const countryService = this.isTenant ? statsAPI.getCountries() : drillDownAPI.fetchCountryList();
    return axios.all([
      mapDataSetAPI.getCountries(),
      countryService,
      mapDataSetAPI.getCountriesRegion(),
    ])
      .then(axios.spread((countries, statsCountries, countriesRegion) => {
        if (statsCountries) {
          statsCountries.map((statsCountry: any) => {
            const countryCode = this.isTenant ? statsCountry.country_code : statsCountry.code;
            const country = countries.features.find((countryData: any) => {
              return countryCode === countryData.country_code;
            });

            if (country) {
              country.has_data = true;
              country.total_students = statsCountry.total_students;
              country.total_teachers = statsCountry.total_teachers;
              country.total_others = statsCountry.total_others;
              country.total_users = statsCountry.total_users;
              country.total_classes = statsCountry.total_classes;
              country.total_competencies_gained = statsCountry.total_competencies_gained;
              country.total_timespent = statsCountry.total_timespent;
              country.total_activities_conducted = statsCountry.total_activities_conducted;
              country.total_navigator_courses = statsCountry.total_navigator_courses;

              if (this.isTenant) {
                country.country_name = statsCountry.country_name;
              } else {
                country.country_id = statsCountry.id;
                country.country_name = statsCountry.name;
              }


              // Calculate the overall count of Student, Teachers and Others
              overallStats.totalStudentsCount += statsCountry.total_students;
              overallStats.totalTeachersCount += statsCountry.total_teachers;
              overallStats.totalOthersCount += statsCountry.total_others;

              const countryRegion = countriesRegion.find((region: any) => {
                return region.country_code === countryCode;
              });
              if (countryRegion) {
                country.latitude = countryRegion.latitude;
                country.longitude = countryRegion.longitude;
              }
            }
          });
        }

        return {
          countries,
          statsCountries,
          overallStats,
        };
      }));
  }

}

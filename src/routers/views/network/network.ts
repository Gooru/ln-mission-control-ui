import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { mapDataSetAPI } from '@/providers/apis/app/map-dataset';
import { statsAPI } from '@/providers/apis/stats/stats';
import NavLearningWorldWide from './nav-learning-worldwide/nav-learning-worldwide';
import Partners from './partners/partners';
import { CountryModel } from '@/models/stats/country';

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
    return axios.all([
      mapDataSetAPI.getCountries(),
      statsAPI.getCountries(),
      mapDataSetAPI.getCountriesRegion(),
    ])
      .then(axios.spread((countries, statsCountries, countriesRegion) => {
        if (statsCountries) {
          statsCountries.map((statsCountry: CountryModel) => {
            const country = countries.features.find((countryData: any) => {
              return statsCountry.country_code === countryData.country_code;
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
              country.country_name = statsCountry.country_name;


              // Calculate the overall count of Student, Teachers and Others
              overallStats.totalStudentsCount += statsCountry.total_students;
              overallStats.totalTeachersCount += statsCountry.total_teachers;
              overallStats.totalOthersCount += statsCountry.total_others;

              const countryRegion = countriesRegion.find((region: any) => {
                return region.country_code === statsCountry.country_code;
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

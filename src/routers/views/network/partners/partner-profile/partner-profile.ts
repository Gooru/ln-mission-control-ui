import { Component, Vue } from 'vue-property-decorator';
import McIcon from '@/components/icons/mc-icon/mc-icon';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import FontAwesomeIcon from '@/components/icons/font-awesome-icon/font-awesome-icon';
import ProfileInfo from './profile-info/profile-info';
import ProfileDistribution from './data-distribution/data-distribution';
import PartnerContentUsage from './partner-content-usage/partner-content-usage';
import axios from 'axios';
import { mapDataSetAPI } from '@/providers/apis/app/map-dataset';
import { statsAPI } from '@/providers/apis/stats/stats';
import { CountryModel } from '@/models/stats/country';
import { PartnersModel } from '@/models/partners/partners';
import { partnersAPI } from '@/providers/apis/partners/partners';
@Component({
  name: 'partner-profile',
  components: {
    'profile-info': ProfileInfo,
    'profile-distribution': ProfileDistribution,
    'partner-content-usage': PartnerContentUsage,
    'google-material-icon': GoogleMaterialIcon,
    'font-awesome-icon': FontAwesomeIcon,
    'mc-icon': McIcon,
  },
})

export default class PartnerProfile extends Vue {

  private mapData: any = null;
  private profileData: any = null;
  private created() {
    const worldMapDataSet = this.fetchNavWorldWideMapData();
    worldMapDataSet.then((data) => {
      this.mapData = data;
    });
  }
  private back() {
    this.$router.back();
  }
  private fetchNavWorldWideMapData() {
    const overallStats = {
      totalStudentsCount: 0,
      totalTeachersCount: 0,
      totalOthersCount: 0,
    };
    return axios.all([
      partnersAPI.getPartnerByID(),
      mapDataSetAPI.getCountries(),
      statsAPI.getCountries(),
      mapDataSetAPI.getCountriesRegion(),
    ])
      .then(axios.spread((partnersData, countries, statsCountries, countriesRegion) => {
        if (statsCountries) {
          countries.features.map((statsCountry: PartnersModel) => {
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
        this.profileData = partnersData;
        return {
          countries,
          statsCountries,
          overallStats,
        };
      }));
  }
}

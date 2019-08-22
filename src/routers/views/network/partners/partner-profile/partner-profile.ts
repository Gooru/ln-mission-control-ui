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

  // -------------------------------------------------
  // Properties

  /**
   * Maintains the data of map plotting values
   */

  private mapData: any = null;

  /**
   * Maintains the partner profile datas
   */
  private partnerProfile: any = null;

  // -------------------------------------------------
  // Hooks

  private created() {
    const worldMapDataSet = this.fetchNavWorldWideMapData();
    worldMapDataSet.then((data) => {
      this.mapData = data;
    });
  }

  // --------------------------------------------------
  // Actions

  private back() {
    this.$router.back();
  }

  // --------------------------------------------------
  // Methods

  private fetchNavWorldWideMapData() {
    const overallStats = {
      totalStudentsCount: 0,
      totalTeachersCount: 0,
      totalOthersCount: 0,
    };
    return axios.all([
      partnersAPI.getPartnerById(this.$route.params.id),
      mapDataSetAPI.getCountries(),
      mapDataSetAPI.getCountriesRegion(),
    ])
      .then(axios.spread((partnersData, countries, countriesRegion) => {
        if (partnersData) {
          partnersData.content_type_stats.map((statsCountry: PartnersModel) => {
            const country = countries.features.find((countryData: any) => {
              return statsCountry.country_code === countryData.country_code;
            });
            if (country) {
              country.has_data = true;
              country.total_students = partnersData.total_students;
              country.total_teachers = partnersData.total_teachers;
              country.total_others = partnersData.total_others;
              country.total_users = partnersData.total_users;
              country.total_classes = partnersData.total_classes;
              country.total_competencies_gained = partnersData.total_competencies_gained;
              country.total_timespent = partnersData.total_timespent;
              country.total_activities_conducted = partnersData.total_activities_conducted;
              country.total_navigator_courses = partnersData.total_navigator_courses;
              country.country_name = partnersData.country_name;
              overallStats.totalStudentsCount += partnersData.total_students;
              overallStats.totalTeachersCount += partnersData.total_teachers;
              overallStats.totalOthersCount += partnersData.total_others;
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
        this.partnerProfile = partnersData;
        return {
          countries,
          overallStats,
        };
      }));
  }
}

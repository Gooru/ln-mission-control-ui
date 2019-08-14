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
    private profileData: any = {
        logo: 'https://nile-tenants.s3-us-west-1.amazonaws.com/partners/77ba26e3-1bc6-4fca-9eed-bdacae71c849.png',
        website: null,
        countries: [
        {
        id: 101,
        code: 'IN',
        name: 'India',
        },
        ],
        partner_id: 61,
        total_users: 4488,
        partner_name: 'Ideaphora',
        total_others: 0,
        total_classes: 874,
        tenant_manager: true,
        total_students: 4368,
        total_teachers: 120,
        videos: ['https://youtu.be/xpyFkDros_o'],
        states: [ {
         id: 1023,
         code: 'CA',
         country_code: 'US',
         name: 'california',
         },
        ],
        partner_type: 'implementation_partners',
        intro: 'simply ',
        categories_usage: [
        {
         code: 'K12IN',
         name: 'K12 IND',
         total_count: 123,
        }],
        subjects_usage: [
        {
         code: 'K12IN.MA',
         name: 'Math',
         total_count: 1231,
        }],
        content_types_usage: [{
         content_type: 'video',
         total_count: 100,
        }],
        };
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

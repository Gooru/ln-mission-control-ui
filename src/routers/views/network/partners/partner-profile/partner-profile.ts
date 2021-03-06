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

  /**
   * Maintain countries data constant
   */
  private storeCountries: any = null;

  // -------------------------------------------------
  // Hooks

  private created() {
    const worldMapDataSet = this.fetchPartnerProfileMapData();
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

  private fetchPartnerProfileMapData() {
    return axios.all([
      partnersAPI.getPartnerById(this.$route.params.id),
      mapDataSetAPI.getCountries(),
      mapDataSetAPI.getCountriesRegion(),
    ])
      .then(axios.spread((partnersData, countriesData, countriesRegion) => {
        this.partnerProfile = partnersData;
        const countries = JSON.parse(JSON.stringify(countriesData));
        const partnerCountries = JSON.parse(JSON.stringify(countriesData));
        if (partnersData) {
          this.getActiveCountriesDetails(partnersData.content_type_stats,
            countries.features, countriesRegion, 'content');
          this.getActiveCountriesDetails(partnersData.countries,
            partnerCountries.features, countriesRegion, 'partner');
        }
        return {
          countries,
          partnerCountries,
        };
      }));
  }

  /**
   * Get active countires for partner info and content usage section
   */

  private getActiveCountriesDetails(partnersData: any, countries: any, countriesRegion: any, contentType: string) {
    partnersData.map((statsCountry: PartnersModel) => {
      const country = countries.find((countryData: any) => {
        return (contentType === 'content' ? statsCountry.country_code : statsCountry.code) === countryData.country_code;
      });
      if (country) {
        country.has_data = true;
        const countryRegion = countriesRegion.find((region: any) => {
          return region.country_code === (contentType === 'content' ? statsCountry.country_code : statsCountry.code);
        });
        if (countryRegion) {
          country.latitude = countryRegion.latitude;
          country.longitude = countryRegion.longitude;
        }
      }
      return country;
    });
  }
}

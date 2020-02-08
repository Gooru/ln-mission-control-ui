import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { drillDownAPI } from '@/providers/apis/drill-down/drill-down';
import {statsAPI} from '@/providers/apis/stats/stats';

@Component({
  name: 'geo-group-picker',
  components: {
  },
})

export default class GeoGroupPicker extends Vue {

  private geoGroupLevel: string = 'country';

  private countries: any = [];

  private states: any = [];

  private districts: any = [];

  private schools: any = [];

  private searchTerm: string = '';

  private filteredItems: any = [];

  public created() {
    this.fetchCountries().then((countries) => {
      this.countries = countries;
      this.filteredItems = countries;
    });
    this.fetchSatesByCountryId();
  }

  @Watch('searchTerm')
  public onChangeSearchTerm() {
    // if (this.searchTerm !== '') {
    //   this.filteredItems = this.countries.filter(country =>
      // country.country_name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    // } else {
    //   this.filteredItems = this.countries;
    // }
  }

  public fetchCountries() {
    return statsAPI.getCountries();
  }

  public fetchSatesByCountryId() {
    // drillDownAPI.fetchStateCompetencyByCountryID();
  }
}

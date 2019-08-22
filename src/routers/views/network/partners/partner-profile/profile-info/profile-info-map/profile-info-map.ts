import { Component, Vue, Prop } from 'vue-property-decorator';
import * as d3 from 'd3';
import axios from 'axios';
import { partnersAPI } from '@/providers/apis/partners/partners';
import { mapDataSetAPI } from '@/providers/apis/app/map-dataset';
import { PartnersModel } from '@/models/partners/partners';

@Component({
  name: 'profile-info-map',
  components: {
  },
})
export default class ProfileInfoMap extends Vue {

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Maintains the value of  nav learning world map  chart width
   * @return {Number}
   */
  private width: number = 400;

  /**
   * Maintains the value of  nav learning world map  chart height
   * @type {Number}
   */
  private height: number = 200;

  /**
   * Maintains the element of map container
   * @type {DOM}
   */
  private mapContainer: any;

  /**
   * Maintains the data of map projection
   * @type {Object}
   */
  private mapProjection: any;

  /**
   * Maintains the data of map plotting values
   * @type {Object}
   */
  private mapData: any;

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Hooks

  private created() {
    const worldMapDataSet = this.fetchPartnerProfileMapData();
    worldMapDataSet.then((data) => {
      this.mapData = data;
      this.draw();
    });
  }

  // -------------------------------------------------------------------------
  // Methods

  private draw() {
    this.mapContainer = d3.select('#profile-info-map')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);
    this.mapProjection = d3.geoEquirectangular()
      .scale(this.height / Math.PI)
      .translate([this.width / 2, this.height / 2]);
    this.drawMap();
  }

  private drawMap() {
    const projection = this.mapProjection;
    const data = this.mapData;
    const path = d3.geoPath()
      .projection(projection);
    const countriesContainer = this.mapContainer.append('svg:g').attr('id', 'countries-container');
    const countries = data.countries;
    countriesContainer.selectAll('path')
      .data(countries.features)
      .enter().append('path')
      .attr('d', path as any)
      .attr('class', (d: any) => {
        return d.has_data ? 'map-path has-data' : 'map-path';
      });
  }

  private fetchPartnerProfileMapData() {
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
          partnersData.countries.map((statsCountry: PartnersModel) => {
            const country = countries.features.find((countryData: any) => {
              return statsCountry.code === countryData.country_code;
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
        return {
          countries,
          overallStats,
        };
      }));
  }

}

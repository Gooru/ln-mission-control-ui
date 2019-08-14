import { Component , Vue , Prop } from 'vue-property-decorator';
import * as d3 from 'd3';
import { numberFormatWithTextSuffix, numberFormat } from '@/helpers/number-format';

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
  private width: number = 500;

  /**
   * Maintains the value of  nav learning world map  chart height
   * @type {Number}
   */
  private height: number = 250;

  /**
   * Maintains the value of  nav learning world map pie  chart width
   * @type {Number}
   */
  private pieWidth: number = 50;

  /**
   * Maintains the value of  nav learning world map pie chart height
   * @type {Number}
   */
  private pieHeight: number = 50;

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
  @Prop()
  private mapData: any;


  /**
   * Set the overall stats from mapData
   */
  private overallStats: any = {};


  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Hooks

  private mounted() {
    if (this.mapData) {
      this.overallStats = this.mapData.overallStats;
      this.draw();
    }
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

  private drawPieChart() {
    const projection = this.mapProjection;
    const data = this.mapData;
    const countries = data.countries.features;
    const countryPieChartContainer = this.mapContainer.append('svg:g').attr('id', 'country-pie-chart');
    const radius = Math.min(this.pieWidth, this.pieHeight) / 2;
    const arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
    const pie = d3.pie()
      .sort(null)
      .value((d: any) => {
        return d.value;
      });
    const countriesHasData = countries.filter((country: any) => {
      return country.has_data;
    });

    countriesHasData.map((countryData: any) => {
      const longitude = countryData.longitude;
      const latitude = countryData.latitude;
      const pieChartContainer = countryPieChartContainer.append('svg')
        .attr('x', projection([longitude, latitude])[0])
        .attr('y', projection([longitude, latitude])[1])
        .attr('class', 'pie-box-shadow')
        .attr('id', `pie-country-${countryData.country_code}`)
        .attr('width', this.pieWidth)
        .attr('height', this.pieHeight).append('g')
        .attr('transform', 'translate(' + this.pieWidth / 2 + ',' + this.pieHeight / 2 + ')');
      const total = countryData.total_students + countryData.total_teachers + countryData.total_others;
      const pieData = [{
        key: 'teacher',
        value: countryData.total_teachers,
      },
      {
        key: 'student',
        value: countryData.total_students,
      }];

      const pieChart = pieChartContainer.selectAll('.arc')
        .data(pie(pieData as any)).enter().append('g').attr('class', 'arc');

      pieChart.append('path')
        .attr('d', arc)
        .attr('class', (d: any) => {
          return `key-${d.data.key}`;
        });

      pieChartContainer.on('mouseover', () => {
        const element = d3.select(`#country-code-${countryData.country_code}`);
        const currentClass = element.attr('class');
        element.attr('class', `${currentClass} on-hover-country`);
       }).on('mouseout', () => {
        const className = 'map-path has-data';
        const element = d3.select(`#country-code-${countryData.country_code}`);
        element.attr('class', className);
      });

      pieChartContainer.append('text')
        .attr('class', 'user-total-count')
        .attr('dominant-baseline', 'middle')
        .attr('text-anchor', 'middle')
        .text(numberFormatWithTextSuffix(total));
    });

  }

  private dropShadow() {
    const defs = this.mapContainer.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'drop-shadow');
    filter.append('feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', 2)
      .attr('result', 'blur');
    filter.append('feOffset')
      .attr('in', 'blur')
      .attr('dx', 2)
      .attr('dy', 2)
      .attr('result', 'offsetBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode')
      .attr('in', 'offsetBlur');
    feMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');
  }


  private numberFormat(value: number) {
    return numberFormat(value);
  }
}

import { Component, Vue, Prop } from 'vue-property-decorator';
import * as d3 from 'd3';
import { numberFormatWithTextSuffix, numberFormat } from '@/helpers/number-format';
import ContentUsageMapPopup from './content-usage-map-poup/content-usage-map-popup';
@Component({
  name: 'partner-content-usage',
  components: {
    'content-usage-map-popup': ContentUsageMapPopup,
  },
})

export default class PartnerContentUsage extends Vue {


  // -------------------------------------------------------------------------
  // Properties

  /**
   * Maintains the value of  nav learning world map  chart width
   * @return {Number}
   */
  private width: number = 1200;

  /**
   * Maintains the value of  nav learning world map  chart height
   * @type {Number}
   */
  private height: number = 500;

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

  private activeCountry: any = null;

  private popoverStyle: any = null;
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
    this.mapContainer = d3.select('#parnter-content-usage-map')
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
    const countriesContainer = this.mapContainer.append('svg:g').attr('id', '#countries-container');
    const countries = data.countries;
    countriesContainer.selectAll('path')
      .data(countries.features)
      .enter().append('path')
      .attr('d', path as any)
      .attr('class', (d: any) => {
        return d.has_data ? 'map-path has-data' : 'map-path';
      }).attr('id', (d: any) => {
        return `country-code-${d.country_code}`;
      }).on('mousemove', (d: any) => {
        if (d.has_data) {
          const boxX = d3.mouse(d3.event.target)[0];
          const boxY = d3.mouse(d3.event.target)[1];
          this.activeCountry = d;
          this.showNavLearningWorldwidePopover(d.country_code, boxX, boxY);
        }
        const element = d3.select(`#country-code-${d.country_code}`);
        const currentClass = element.attr('class');
        element.attr('class', `${currentClass} on-hover-country`);
      })
      .on('mouseout', (d: any) => {
        const className = d.has_data ? 'map-path has-data' : 'map-path';
        const element = d3.select(`#country-code-${d.country_code}`);
        element.attr('class', className);
        this.activeCountry = null;
      });
  }
  private numberFormat(value: number) {
    return numberFormat(value);
  }

  private showNavLearningWorldwidePopover(countryCode: string, x: any, y: any) {
    const element = `#country-code-${countryCode}`;
    const xAxis = x;
    const yAxis = y;
    const newXAxisVal = (xAxis + 600) > window.innerWidth ? (xAxis - 400) : (xAxis + 50);
    const style = {
      top: `${yAxis}px`,
      left: `${newXAxisVal}px`,
    };
    this.popoverStyle = style;
  }
}

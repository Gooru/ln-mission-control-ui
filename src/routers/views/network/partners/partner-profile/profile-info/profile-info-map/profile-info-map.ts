import { Component, Vue, Prop } from 'vue-property-decorator';
import * as d3 from 'd3';

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

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Hooks

  private mounted() {
    if (this.mapData) {
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

}

import { Component, Vue, Prop } from 'vue-property-decorator';
import * as d3 from 'd3';
import { numberFormatWithTextSuffix, numberFormat } from '@/helpers/number-format';
import NavLearningWorldWidePopover from './nav-learning-worldwide-popover/nav-learning-worldwide-popover';
import { sessionService } from '@/providers/services/auth/session';
import { appConfigService } from '@/providers/services/app/app-config';
import { DEMO_USERS } from '@/utils/constants';


@Component({
  name: 'nav-learning-worldwide',
  components: {
    'nav-learning-worldwide-popover': NavLearningWorldWidePopover,
  },
})
export default class NavLearningWorldWide extends Vue {

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Maintains the value of  nav learning world map  chart width
   * @return {Number}
   */
  private width: number = 960;

  /**
   * Maintains the value of  nav learning world map  chart height
   * @type {Number}
   */
  private height: number = 500;

  /**
   * Maintains the value of  nav learning world map circle maxwidth
   * @type {Number}
   */
  private circleMaxWidth: number = 80;

  /**
   * Maintains the value of  nav learning world map circle maxheight
   * @type {Number}
   */
  private circleMaxHeight: number = 80;

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
   * Maintains the country object when hover the circle.
   */
  private activeCountry: any = null;

  /**
   * Maintains the popover default position.
   * @return {Object}
   */
  private popoverStyle: any = {
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
  };

  /**
   * Set the overall stats from mapData
   */
  private overallStats: any = {};

  get session() {
    return sessionService.getSession();
}

get isTenant() {
    return this.$access.hasPermission(this.$access.menus.network, this.$access.ACL.all)
        || this.$access.hasPermission(this.$access.menus.network, this.$access.ACL.partner);
}


private get isDrilldown() {
  return this.$access.hasPermission(this.$access.menus.network, this.$access.ACL.compDrilldown)
            || this.$access.hasPermission(this.$access.menus.network, this.$access.ACL.compDrillAnalytic);
}



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
    this.mapContainer = d3.select('#nav-learning-worldwide-map')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);
    this.mapProjection = d3.geoEquirectangular()
      .scale(this.height / Math.PI)
      .translate([this.width / 2, this.height / 2]);
    this.dropShadow();
    this.drawMap();
    this.drawCircle();
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
      }).attr('id', (d: any) => {
        return `country-code-${d.country_code}`;
      })
      .on('mouseover', (d: any) => {
        const element = d3.select(`#country-code-${d.country_code}`);
        const currentClass = element.attr('class');
        element.attr('class', `${currentClass} on-hover-country`);
      })
      .on('mouseout', (d: any) => {
        const className = d.has_data ? 'map-path has-data' : 'map-path';
        const element = d3.select(`#country-code-${d.country_code}`);
        element.attr('class', className);
      });
  }

  private drawCircle() {
    const projection = this.mapProjection;
    const data = this.mapData;
    const countries = data.countries.features;
    const countryCircleContainer = this.mapContainer.append('svg:g').attr('id', 'country-circle-container');

    const countriesHasData = countries.filter((country: any) => {
      return country.has_data;
    });

    countriesHasData.map((countryData: any) => {
      const longitude = countryData.longitude;
      const latitude = countryData.latitude;
      const circleChartContainer = countryCircleContainer.append('svg')
        .attr('x', projection([longitude, latitude])[0])
        .attr('y', projection([longitude, latitude])[1])
        .attr('id', `circle-country-${countryData.country_code}`)
        .attr('width', this.circleMaxWidth)
        .attr('height', this.circleMaxHeight).append('g')
        .attr('transform', 'translate(' + this.circleMaxWidth / 2 + ',' + this.circleMaxHeight / 2 + ')');
      const total = countryData.total_students + countryData.total_teachers + countryData.total_others;
      circleChartContainer.on('mouseover', () => {
        if (this.isTenant) {
          const element = d3.select(`#country-code-${countryData.country_code}`);
          const currentClass = element.attr('class');
          element.attr('class', `${currentClass} on-hover-country`);
          this.activeCountry = countryData;
          this.showNavLearningWorldwidePopover(countryData.country_code);
        }
      }).on('mouseout', () => {
        const className = 'map-path has-data';
        const element = d3.select(`#country-code-${countryData.country_code}`);
        element.attr('class', className);
        this.activeCountry = null;
      }).on('click', (d: any) => {
        if (this.isDrilldown) {
          this.$router.push(`/network/countries/${countryData.country_id}/${countryData.country_name}`);
        }
      });
      const numberOfDigits = total.toString().length;
      circleChartContainer.append('circle').attr('r', this.circleRadius(numberOfDigits));
      if (numberOfDigits > 5 && this.isTenant) {
        circleChartContainer.append('text')
          .attr('class', 'user-total-count')
          .attr('dominant-baseline', 'middle')
          .attr('text-anchor', 'middle')
          .text(numberFormatWithTextSuffix(total));
      }
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

  private showNavLearningWorldwidePopover(countryCode: string) {
    const element = `#circle-country-${countryCode}`;
    const xAxis = Number(d3.select(element).attr('x'));
    const yAxis = Number(d3.select(element).attr('y'));
    const newXAxisVal = (xAxis + 580) > window.innerWidth ? (xAxis - 340) : (xAxis + 80);
    const style = {
      top: `${yAxis}px`,
      left: `${newXAxisVal}px`,
    };
    this.popoverStyle = style;
  }

  private circleRadius(numberOfDigits: number) {
    if (numberOfDigits <= 2) {
      return 8;
    } else if (numberOfDigits === 3) {
      return 12;
    } else if (numberOfDigits === 4) {
      return 16;
    } else if (numberOfDigits === 5) {
      return 24;
    } else if (numberOfDigits >= 6) {
      return 36;
    }
  }

}

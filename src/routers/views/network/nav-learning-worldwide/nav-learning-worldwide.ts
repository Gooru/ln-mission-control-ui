import { Component, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';
import { mapDataSetAPI } from '@/providers/apis/app/map-dataset';
import { userAPI } from '@/providers/apis/user/user';
import { numberFormatWithTextSuffix, numberFormat } from '@/helpers/number-format';
import axios from 'axios';

@Component({ name: 'nav-learning-worldwide' })
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
   * Maintains the value of  nav learning world map pie  chart width
   * @type {Number}
   */
  private pieWidth: number = 65;

  /**
   * Maintains the value of  nav learning world map pie chart height
   * @type {Number}
   */
  private pieHeight: number = 65;

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

  /**
   * Maintains the value of total number of students
   * @type {Number}
   */
  private totalStudentCount: number = 0;

  /**
   * Maintains the value of total number of teachers
   * @type {Number}
   */
  private totalTeacherCount: number = 0;

  /**
   * Maintains the value of total number of others
   * @type {Number}
   */
  private totalOtherCount: number = 0;


  // -------------------------------------------------------------------------
  // Computed Properties

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Hooks

  private mounted() {
    this.draw();
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
    const worldMapDataSet = this.fetchNavWorldWideMapData();
    worldMapDataSet.then((data) => {
      this.mapData = data;
      this.drawMap();
      this.drawPieChart();
    });
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
        return `country-code-${d.id}`;
      })
      .on('mouseover', (d: any) => {
        const element = d3.select(`#country-code-${d.id}`);
        const currentClass = element.attr('class');
        element.attr('class', `${currentClass} on-hover-country`);
      })
      .on('mouseout', (d: any) => {
        const className = d.has_data ? 'map-path has-data' : 'map-path';
        const element = d3.select(`#country-code-${d.id}`);
        element.attr('class', className);
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

    countriesHasData.map((countryHasData: any) => {
      const longitude = countryHasData.longitude;
      const latitude = countryHasData.latitude;
      const pieChartContainer = countryPieChartContainer.append('svg')
        .attr('x', projection([longitude, latitude])[0])
        .attr('y', projection([longitude, latitude])[1])
        .attr('class', 'pie-box-shadow')
        .attr('width', this.pieWidth)
        .attr('height', this.pieHeight).append('g')
        .attr('transform', 'translate(' + this.pieWidth / 2 + ',' + this.pieHeight / 2 + ')');
      const pieData = [{
        color: 'green',
        value: 30,
      },
      {
        color: 'white',
        value: 20,
      },
      {
        color: 'blue',
        value: 90,
      }];

      const pieChart = pieChartContainer.selectAll('.arc')
        .data(pie(pieData as any)).enter().append('g').attr('class', 'arc');

      pieChart.append('path')
        .attr('d', arc)
        .style('fill', (d: any) => {
          return d.data.color;
        });
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

  private fetchNavWorldWideMapData() {
    return axios.all([
      mapDataSetAPI.getCountries(),
      userAPI.getUserDistributionByGeoLocation(),
      mapDataSetAPI.getCountriesRegion(),
    ])
      .then(axios.spread((countries, userDistributionByGeoLocation, countriesRegion) => {
        if (userDistributionByGeoLocation) {
          userDistributionByGeoLocation.map((geoLocation: any) => {
            const country = countries.features.find((countryData: any) => {
              return geoLocation.code === countryData.id;
            });
            if (country) {
              country.has_data = true;

              country.total_student = geoLocation.student_total;
              country.total_teacher = geoLocation.teacher_total;
              country.total_other = geoLocation.total_other;
              country.active_student = geoLocation.active_student;
              country.active_classroom = geoLocation.active_classroom;
              country.competencies_gained = geoLocation.competencies_gained;
              country.total_timespent = geoLocation.total_timespent;
              country.activities_conducted = geoLocation.activities_conducted;
              country.navigator_courses = geoLocation.navigator_courses;

              // Calculate the overall count of Student, Teachers and Others
              this.totalStudentCount += geoLocation.total_student;
              this.totalTeacherCount += geoLocation.total_teacher;
              this.totalOtherCount += geoLocation.total_other;

              const countryRegion = countriesRegion.find((region: any) => {
                return region.code === geoLocation.code;
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
          userDistributionByGeoLocation,
        };
      }));
  }

  private numberFormat(value: number) {
    return numberFormat(value);
  }

}

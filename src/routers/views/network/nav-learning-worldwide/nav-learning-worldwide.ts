import { Component, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';
import { mapDataSetAPI } from '@/providers/apis/app/map-dataset';
import { userAPI } from '@/providers/apis/user/user';

@Component({ name: 'nav-learning-worldwide' })
export default class NavLearningWorldWide extends Vue {

  // -------------------------------------------------------------------------
  // Properties

  // -------------------------------------------------------------------------
  // Computed Properties

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Hooks

  public mounted() {
    const width = 960;
    const height = 700;

    const svg = d3.select('#nav-learning-worldwide-map')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('class', 'map');

    const projection = d3.geoMercator()
      .scale(960 / Math.PI / 2)  // 960 pixels over 2 π radians
      .translate([480, 480]);  // the center of the SVG/canvas

    const path = d3.geoPath().projection(projection);

    mapDataSetAPI.getCountries().subscribe((countries) => {
      svg.append('g')
        .attr('class', 'countries')
        .selectAll('path')
        .data(countries.features)
        .enter().append('path')
        .attr('d', path as any)
        .style('fill', '#ccc')
        .style('stroke', 'white')
        .style('stroke-width', 1.5)
        .style('opacity', 0.8)
        // tooltips
        .style('stroke', 'white')
        .style('stroke-width', 0.3)
        .on('mouseover', function(d) {

          d3.select(this)
            .style('opacity', 1)
            .style('stroke', 'white')
            .style('stroke-width', 3);
        })
        .on('mouseout', function(d) {


          d3.select(this)
            .style('opacity', 0.8)
            .style('stroke', 'white')
            .style('stroke-width', 0.3);
        });

    });

  }

  // -------------------------------------------------------------------------
  // Methods

}

import { Component, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';

@Component({
    name: 'distribution-by-content',
    components: {
    },
})

export default class DistributionByContent extends Vue {
    private width = 300;
    private height = 300;
    private margin = 40;
    private svg: any = null;
    private radius = Math.min(this.width, this.height) / 2 - this.margin;


    private mounted() {
        this.selectDiv();
    }



    private selectDiv() {
        this.svg = d3.select('#my_dataviz')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
        this.darwCircle();
    }



    private darwCircle() {
        const clr = ['#ffffff', '#c5e5d0', '#9ed5b2', '#77c493', '#51b374'];
        const data: any = { IN: 9, AUS: 20, US: 30, UAE: 8, ENG: 12 };
        const color = d3.scaleOrdinal(clr);
        const pie: any = d3.pie()
            .value( (d: any) =>  d.value );
        const dataready = pie(d3.entries(data));
        const arcGenerator: any = d3.arc()
            .innerRadius(0)
            .outerRadius(this.radius);
        const labelarc: any = d3.arc().innerRadius(this.radius).outerRadius(this.radius - 80);
        this.svg
            .selectAll('mySlices')
            .data(dataready)
            .enter()
            .append('path')
            .on('mouseover', (d: any) => {
                d3.select(d3.event.target).attr('style', 'opacity:0.6');
              })
              .on('mouseout', (d: any) => {
                d3.select(d3.event.target).attr('style', 'opacity:1');
              })
            .attr('d', arcGenerator)
            .attr('fill', (d: any) =>  color(d.data.key) )
            .style('opacity', 1);
        this.svg
            .selectAll('mySlices')
            .data(dataready)
            .enter()
            .append('text')
            .text( (d: any) =>   d.data.key )
            .on('mouseover', (d: any) => {
                d3.select(d3.event.target).attr('color', 'red');
              })
            .attr('transform', (d: any) =>  'translate(' + labelarc.centroid(d) + ')' )
            .style('text-anchor', 'middle')
            .style('color', '#fff')
            .style('font-size', 13);
    }
}

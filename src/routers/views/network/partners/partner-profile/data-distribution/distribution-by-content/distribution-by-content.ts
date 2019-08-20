import { Component, Vue, Prop } from 'vue-property-decorator';
import * as d3 from 'd3';
import { numberFormatWithTextSuffix } from '@/helpers/number-format';
import { CONTENT_TYPE } from '@/utils/constants';

@Component({
    name: 'distribution-by-content',
    components: {
    },
})

export default class DistributionByContent extends Vue {
    @Prop()
    private profileData: any;
    private width = 300;
    private height = 300;
    private margin = 40;
    private svg: any = null;
    private radius = Math.min(this.width, this.height) / 2 - this.margin;
    private constantData: any = CONTENT_TYPE;


    private mounted() {
        this.darwCircle();
    }
    private darwCircle() {
        const divList = d3.select('#my_dataviz').append('div').classed('tooltip1', true);
        this.svg = d3.select('#my_dataviz')
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .append('g')
        .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
        const color = d3.scaleOrdinal(['#ffffff', '#c5e5d0', '#9ed5b2', '#77c493', '#51b374']);
        const data: any = this.profileData.content_type_distribution;
        const pie: any = d3.pie()
             .value( (d: any) =>  d.total_count );
        const dataready = pie(data);
        const arcGenerator: any = d3.arc()
            .innerRadius(0)
            .outerRadius(this.radius);
        const labelarc: any = d3.arc().innerRadius(this.radius).outerRadius(this.radius + 35);
        this.svg
            .selectAll('mySlices')
            .data(dataready)
            .enter()
            .append('path')
            .on('mousemove', (d: any) => {
                divList.html('<p>' + this.constantData.find((type: any) =>
                (type.type === d.data.content_type)).name  + '</p>')
                    .style('left', d3.event.pageX + 10 + 'px')
                    .style('top', d3.event.pageY - 12 + 'px')
                    .style('opacity', 1)
                    .style('display', 'block');
              })
              .on('mouseout', (d: any) => {
                divList.style('opacity', 0)
                       .style('display', 'none');
              })
            .attr('d', arcGenerator)
            .attr('fill', (d: any, i: any) =>  color(i) )
            .style('opacity', 1)
            .append('text')
            .text( (d: any) => d.data.total_count);
        this.svg
            .selectAll('mySlices')
            .data(dataready)
            .enter()
            .append('text')
            .text( (d: any) => numberFormatWithTextSuffix(d.data.total_count))
            .attr('transform', (d: any) =>  'translate(' + labelarc.centroid(d) + ')' )
            .style('text-anchor', 'middle')
            .on('mousemove', (d: any) => {
                divList.html('<p>' + this.constantData.find((type: any) =>
                (type.type === d.data.content_type)).name  + '</p>')
                    .style('left', d3.event.pageX + 10 + 'px')
                    .style('top', d3.event.pageY - 12 + 'px')
                    .style('opacity', 1)
                    .style('display', 'block');
              })
              .on('mouseout', (d: any) => {
                divList.style('opacity', 0)
                       .style('display', 'none');
              })
            .style('fill', '#fff')
            .style('font-weight', '900')
            .style('font-size', 12);
    }

    private numberFormatWithTextSuffix(value: number) {
        return numberFormatWithTextSuffix(value);
      }
}

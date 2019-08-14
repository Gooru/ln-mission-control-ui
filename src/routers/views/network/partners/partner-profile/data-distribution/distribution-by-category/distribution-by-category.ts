import { Component, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';

@Component({
    name: 'distribution-by-category',
    components: {
    },
})

export default class DistributionByCategory extends Vue {
    private width = 300;
    private height = 300;
    private margin = 40;
    private svg: any = null;
    private radius = Math.min(this.width, this.height) / 2 - this.margin;

    private mounted() {
        this.selectDiv();
    }

    private selectDiv() {
        this.svg = d3.select('#piechart')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
        this.darwCircle(this.svg, 0 , 38);
        this.svg = d3.select('#piechartinner')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
        this.darwCircle(this.svg, 40, 70);
        }

    private darwCircle(svg: any , outer: any, inner: any) {
        const data: any = { IN: 9, AUS: 20, US: 30, UAE: 8, ENG: 12 };
        const color = d3.scaleOrdinal(['#ffffff', '#c5e5d0', '#9ed5b2', '#77c493', '#51b374']);
        const pie: any = d3.pie()
            .value( (d: any) => d.value);
        const dataready = pie(d3.entries(data));
        svg
            .selectAll('whatever')
            .data(dataready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(this.radius - inner)
                .outerRadius(this.radius - outer),
            )
            .attr('fill', (d: any) => color(d.data.key))
            .style('opacity', 1);
    }
}

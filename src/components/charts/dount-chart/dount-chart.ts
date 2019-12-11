import { Component, Vue, Prop } from 'vue-property-decorator';
import * as d3 from 'd3';

@Component({
    name: 'dount-chart',
})

export default class DountChart extends Vue {

    // --------------------------------------------------------------
    // Properties
    @Prop()
    private width?: any;
    @Prop()
    private height?: any;
    @Prop()
    private diff?: any;
    @Prop()
    private count?: any;
    @Prop()
    private title?: any;
    @Prop()
    private margin?: any;
    @Prop()
    private data?: any;

    // -------------------------------------------------------------
    // Hooks

    private mounted() {
        this.drawDonut();
    }

    // ---------------------------------------------------------------
    // Methods
    private drawDonut() {
        const radius = Math.min(this.width, this.height) / 2 - this.margin;
        const svg = d3.select(this.$el)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
        const data: any = this.data;
        const pie = d3.pie()
            .value((d: any) => d.value);

        const arc: any = d3.arc()
            .innerRadius(radius - this.diff)
            .outerRadius(radius);
        const maxData: any = d3.min(data, (d: any) => d);
        const g = svg.selectAll('.arc')
            .data(pie(data))
            .enter().append('g');

        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '20px')
            .style('font-weight', 'bold')
            .append('svg:tspan')
            .attr('x', 0)
            .text(this.count)
            .style('fill', maxData.color)
            .append('svg:tspan')
            .style('font-size', '11px')
            .attr('x', 0)
            .style('font-weight', '100')
            .attr('dy', 20)
            .text(this.title)
            .style('fill', '#000');


        svg.selectAll('arc')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d: any) => d.data.color)
            .style('opacity', 0.7);

    }

}

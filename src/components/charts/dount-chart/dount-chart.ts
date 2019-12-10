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
    @Prop()
    private color?: any;

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
        const data: any = [{
            name: 'chart',
            value: 530,
        },
        {
            name: 'chart1',
            value: 300,
        },
        ];
        const color: any = d3.scaleOrdinal()
            .domain(data)
            .range(['#febb2b', '#ebeced' ].reverse());
        const pie = d3.pie()
            .value((d: any) =>  d.value);

        const arc: any = d3.arc()
            .innerRadius(radius - this.diff)
            .outerRadius(radius);

        const g = svg.selectAll('.arc')
            .data(pie(data))
            .enter().append('g');

        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '20px')
            .attr('dy', 5)
            .text(this.count)
            .style('fill', '#febb2b');


        svg.selectAll('arc')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d: any, i: any) =>  color(i))
            .style('opacity', 0.7);

    }

}

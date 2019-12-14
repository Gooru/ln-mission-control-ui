import { Component, Vue, Prop } from 'vue-property-decorator';
import * as d3 from 'd3';
import moment from 'moment';

@Component({
    name: 'texas-line-chart',
})

export default class TexasLineChart extends Vue {

    // ------------------------------------------------------------------
    // Properties
    @Prop()
    private dataList: any;

    private tooltipData?: any = null;

    private tooltipStyle?: any = null;

    // -----------------------------------------------------------------
    // Hooks
    private mounted() {
        this.drawLineChart();
    }

    // ------------------------------------------------------------------
    // Methods

    private drawLineChart() {
        // set the dimensions and margins of the graph
        const margin = { top: 10, right: 30, bottom: 30, left: 60 };
        const width = this.$el.clientWidth - margin.left - margin.right;
        const height = 200 - margin.top - margin.bottom;
        // append the svg object to the body of the page
        const svg = d3.select('#texas_chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform',
                'translate(' + margin.left + ',' + margin.top + ')');

        const data: any = [
            {
                week: 47,
                competency_count: 6140.71,
            },
            {
                week: 48,
                competency_count: 5140.71,
            },
            {
                week: 49,
                competency_count: 3140.71,
            },
            {
                week: 50,
                competency_count: 7140.71,
            },
            {
                week: 51,
                competency_count: 5140.71,
            },
            {
                week: 52,
                competency_count: 7140.71,
            },
        ];

        const xMinValue: any = d3.min(data, (d: any) => d.week);

        const x = d3.scaleLinear()
            .domain([xMinValue - .3 , xMinValue + 5])
            .range([0, width]);

        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x).ticks(5).tickSize(10).tickFormat((d: any) => {
                return  (moment().week() === d) ? 'Current Week ' + d : 'Week ' + d ;
            }))
            .style('font-size', '12px')
            .attr('stroke', '#fff');

        const yMaxValue: any = d3.max(data, (d: any) => d.competency_count);


        const y = d3.scaleLinear()
            .domain([0, yMaxValue + 1])
            .range([height, 0]);

        svg.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(y).ticks(6).tickSize(0).tickPadding(20))
            .attr('stroke', '#fff');

        // Add the line
        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#fff')
            .attr('stroke-width', 1)
            .attr('d', d3.line()
                .x((d: any) => x(d.week))
                .y((d: any) => y(d.competency_count)),
            );
        // Lines
        svg.append('g').selectAll('myline')
            .data(data)
            .enter()
            .append('line')
            .attr('x1', (d: any) => x(d.week))
            .attr('x2', (d: any) => x(d.week))
            .attr('y2', y(0))
            .attr('y1', (d: any) => y(d.competency_count))
            .on('mousemove', (d: any) => {
                this.tooltipActive(d, x, y);
            })
            .on('mouseleave', (d: any) => {
                this.tooltipData = null;
            })
            .attr('stroke', (d: any) => {
                if ((d.week === moment().week())) {
                    this.tooltipStyle = {
                        toolX: x(d.week) + 40,
                        toolY: y(d.competency_count) + 180,
                    };
                    this.tooltipData = d;
                }
                return (d.week === moment().week()) ? '#fff' : '#ffffff3d';
            })
            .attr('stroke-width', 30);

        // Add the points
        svg
            .append('g')
            .selectAll('dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', (d: any) => x(d.week) as number)
            .attr('cy', (d: any) => y(d.competency_count))
            .attr('r', 4)
            .attr('fill', '#2073bb')
            .attr('stroke', '#fff')
            .on('mousemove', (d: any) => {
                this.tooltipActive(d, x, y);
            })
            .on('mouseleave', (d: any) => {
                this.tooltipData = null;
            });

    }

    private tooltipActive(d: any, x: any, y: any) {
        this.tooltipStyle = {
            toolX: x(d.week) + 40,
            toolY: y(d.competency_count) + 180,
        };
        this.tooltipData = d;
    }

}

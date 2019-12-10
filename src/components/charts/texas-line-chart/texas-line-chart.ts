import { Component, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';

@Component({
    name: 'texas-line-chart',
})

export default class TexasLineChart extends Vue {

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
        const width = 500 - margin.left - margin.right;
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
                date: '2018-04-14',
                value: 3140.71,
            },
            {
                date: '2018-04-15',
                value: 3040.71,
            },
            {
                date: '2018-04-16',
                value: 4371.15,
            },
            {
                date: '2018-04-17',
                value: 2285.96,
            },
            {
                date: '2018-04-18',
                value: 5197.8,
            },
        ];

        const x = d3.scaleTime()
            .domain(d3.extent(data, (d: any) => d3.timeParse('%Y-%m-%d')(d.date)) as [Date, Date])
            .range([0, width]);

        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x).ticks(5).tickSize(10))
            .attr('stroke', '#fff');

        const y = d3.scaleLinear()
            .domain([0, 8000])
            .range([height, 0]);

        svg.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(y).ticks(5).tickSize(0).tickPadding(20))
            .attr('stroke', '#fff');

        // Add the line
        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#fff')
            .attr('stroke-width', 1)
            .attr('d', d3.line()
                .x((d: any) => x(d3.timeParse('%Y-%m-%d')(d.date) as Date))
                .y((d: any) => y(d.value)),
            );

        // Lines
        svg.append('g').selectAll('myline')
            .data(data)
            .enter()
            .append('line')
            .attr('x1', (d: any) => x(d3.timeParse('%Y-%m-%d')(d.date) as Date))
            .attr('x2', (d: any) => x(d3.timeParse('%Y-%m-%d')(d.date) as Date))
            .attr('y1', (d: any) => y(d.value))
            .attr('y2', y(0))
            .attr('stroke', '#ffffff3d')
            .attr('stroke-width', 10);

        // Add the points
        svg
            .append('g')
            .selectAll('dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', (d: any) => x(d3.timeParse('%Y-%m-%d')(d.date) as Date))
            .attr('cy', (d: any) => y(d.value))
            .attr('r', 3)
            .attr('fill', '#2073bb')
            .attr('stroke', '#fff');


    }

}

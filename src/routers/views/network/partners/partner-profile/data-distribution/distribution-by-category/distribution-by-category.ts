import { Component, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';

@Component({
    name: 'distribution-by-category',
    components: {
    },
})

export default class DistributionByCategory extends Vue {

    private mounted() {
        this.selectDiv();
    }

    private selectDiv() {
        const dataset = {
            apples: [53245, 28479, 19697, 24037, 40245],
            pear: [53245, 28479],
        };
        const width = 300;
        const height = 300;
        const margin = 40;
        const radius = Math.min(width, height) / 2 - margin;

        const color = d3.scaleOrdinal(['#3180c0', '#bad4ea', '#8db8dc', '#5f9cce', '#ffffff']);

        const pie = d3.pie()
            .sort(null);

        const piedata = pie(dataset.apples);
        const piedata2 = pie(dataset.pear);

        const arc: any = d3.arc()
            .innerRadius(radius - 80)
            .outerRadius(radius - 50);
        const arc2: any = d3.arc()
            .innerRadius(radius)
            .outerRadius(radius - 40);
        const arcOver: any = d3.arc()
            .innerRadius(radius + 5 )
            .outerRadius(radius - 45);
        const arcOver1: any = d3.arc()
            .innerRadius(radius - 85)
            .outerRadius(radius - 45);

        const svg = d3.select('#piechart-category').append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
        const div = d3.select('#piechart-category').append('div').attr('class', 'tooltip');
        const divList = d3.select('#piechart-category').append('ul').classed('list-category', true);
        divList.selectAll('li')
            .data(piedata)
            .enter()
            .append('li')
            .style('background-color', (d: any, i: any) => {
                return color(i);
            }).append('span').text((d: any) => d.data);
        const path2 = svg.selectAll('g').append('g').attr('id', 'pie')
            .data(piedata)
            .enter().append('path')
            .attr('fill', (d, i: any) => {
                return color(i);
            })
            .on('mousemove', (d) => {
                d3.select(d3.event.target)
                    .attr('stroke', 'white')
                    .attr('d', arcOver);

                div.html('<h6>Tooltip Value ' + d.data + '</h6>')
                    .style('left', (d3.event.pageX + 12) + 'px')
                    .style('top', (d3.event.pageY - 10) + 'px')
                    .style('opacity', 1)
                    .style('display', 'block');
            })
            .on('mouseout', (d) => {
                d3.select(d3.event.target)
                    .attr('stroke', 'none')
                    .transition()
                    .duration(100)
                    .attr('d', arc2);
                div.style('display', 'none').style('opacity', 0);
            })
            .attr('d', arc2);

        const path = svg.selectAll('g').append('g').attr('id', 'donut')
            .data(piedata2)
            .enter().append('path')
            .attr('fill', (d, i: any) => {
                return color(i);
            })
            .on('mousemove', (d) => {

                d3.select(d3.event.target)
                .attr('stroke', 'white')
                .attr('d', arcOver1);

                div.html('<h6>Tooltip Value ' + d.data + '</h6>')
                    .style('left', (d3.event.pageX + 12) + 'px')
                    .style('top', (d3.event.pageY - 10) + 'px')
                    .style('opacity', 1)
                    .style('display', 'block');
            })
            .on('mouseout', (d) => {
                d3.select(d3.event.target)
                    .attr('stroke', 'none')
                    .transition()
                    .duration(100)
                    .attr('d', arc);
                div.style('display', 'none').style('opacity', 0);
            })
            .attr('d', arc);




    }
}

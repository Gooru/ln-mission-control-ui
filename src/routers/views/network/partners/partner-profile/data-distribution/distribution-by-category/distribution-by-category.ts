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
        const margin = 30;
        const radius = Math.min(width, height) / 2 - margin;

        const color = d3.scaleOrdinal(['#ffffff', '#c5e5d0', '#9ed5b2', '#77c493', '#51b374']);

        const pie = d3.pie()
            .sort(null);

        const piedata = pie(dataset.apples);
        const piedata2 = pie(dataset.pear);

        const arc: any = d3.arc()
            .innerRadius(radius - 100)
            .outerRadius(radius - 70);
        const arc2: any = d3.arc()
            .innerRadius(radius - 10)
            .outerRadius(radius - 60);

        const svg = d3.select('#piechart').append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
        const div = d3.select('#piechart').append('div').attr('class', 'tooltip');

        const path2 = svg.selectAll('g').append('g').attr('id', 'pie')
            .data(piedata)
            .enter().append('path')
            .attr('fill', (d, i: any) => {
                return color(i);
            })
            .on('mousemove', (d) => {
                div.html('this is tooltip ' + d.data)
                    .style('left', (d3.event.pageX + 12) + 'px')
                    .style('top', (d3.event.pageY - 10) + 'px')
                    .style('opacity', 1).style('display', 'block');
            })
            .on('mouseout', (d) => {
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
                div.html('this is tooltip')
                    .style('left', (d3.event.pageX + 12) + 'px')
                    .style('top', (d3.event.pageY - 10) + 'px')
                    .style('opacity', 1).style('display', 'block');
            })
            .on('mouseout', (d) => {
                div.style('display', 'none').style('opacity', 0);
            })
            .attr('d', arc);




    }
}

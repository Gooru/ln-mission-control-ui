import { Component, Vue, Prop } from 'vue-property-decorator';
import * as d3 from 'd3';

@Component({
    name: 'distribution-by-category',
    components: {
    },
})

export default class DistributionByCategory extends Vue {
    @Prop()
    private profileData: any;
    private mounted() {
        this.selectDiv();
    }

    private selectDiv() {
        const dataset1 = this.profileData.categories_usage;
        const dataset2 = this.profileData.subjects_usage;
        const width = 300;
        const height = 300;
        const margin = 40;
        const radius = Math.min(width, height) / 2 - margin;

        const color = d3.scaleOrdinal(['#3180c0', '#bad4ea', '#8db8dc', '#5f9cce', '#ffffff']);

        const pie = d3.pie()
            .value((d: any) => d.total_count);
        const arc: any = d3.arc()
            .innerRadius(radius - 80)
            .outerRadius(radius - 50);
        const arc2: any = d3.arc()
            .innerRadius(radius)
            .outerRadius(radius - 40);
        const arcOver: any = d3.arc()
            .innerRadius(radius + 5)
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
        const path2 = svg.selectAll('g').append('g').attr('id', 'pie')
            .data(pie(dataset1))
            .enter().append('path')
            .attr('fill', (d, i: any) => {
                return color(i);
            })
            .on('mousemove', (d: any) => {
                d3.select(d3.event.target)
                    .attr('stroke', 'white')
                    .attr('d', arcOver);
                div.html('<h6>' + d.data.name + '<br>' + d.data.total_count + '</h6>')
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
            .data(pie(dataset2))
            .enter().append('path')
            .attr('fill', (d, i: any) => {
                return color(i);
            })
            .on('mousemove', (d: any) => {

                d3.select(d3.event.target)
                    .attr('stroke', 'white')
                    .attr('d', arcOver1);

                div.html('<h6>' + d.data.name + '<br>' + d.data.total_count + '</h6>')
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

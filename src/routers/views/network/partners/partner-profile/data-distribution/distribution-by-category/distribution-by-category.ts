import { Component, Vue, Prop } from 'vue-property-decorator';
import * as d3 from 'd3';
import { CATEGORY_DISTRIBUTION } from '@/utils/constants';

@Component({
    name: 'distribution-by-category',
    components: {
    },
})

export default class DistributionByCategory extends Vue {

    // --------------------------------------------------------------------------------
    // Properties

    /**
     * Width of category svg
     */
    private width: number = 300;

    /**
     * Height of category svg
     */
    private height: number = 300;

    /**
     * Margin for Dount chart
     */
    private margin: number = 40;

    /**
     * Dount radius
     */
    private radius: number = Math.min(this.width, this.height) / 2 - this.margin;

    /**
     * Passing data while hovering dount chart
     */
    private categoryDountOverData: object = {};

    /**
     * Maintains partner profile data
     */
    @Prop()
    private partnerProfile: any;

    // ---------------------------------------------------------------------------------
    // Hooks

    private mounted() {
        this.drawDount();
    }

    // ---------------------------------------------------------------------------------
    // Methods

    private drawDount() {

        const subjectDountData = this.partnerProfile.subject_distribution;
        const categoryDountData = this.partnerProfile.category_distribution;

        const color = d3.scaleOrdinal(CATEGORY_DISTRIBUTION.color);

        const categoryPie = d3.pie()
            .value((d: any) => d.total_count);

        const categoryDountArc: any = d3.arc()
            .innerRadius(this.radius - 80)
            .outerRadius(this.radius - 50);
        const subjectDountArc: any = d3.arc()
            .innerRadius(this.radius)
            .outerRadius(this.radius - 40);
        const subjectDountOverArc: any = d3.arc()
            .innerRadius(this.radius + 2)
            .outerRadius(this.radius - 42);
        const categoryDountOverArc: any = d3.arc()
            .innerRadius(this.radius - 82)
            .outerRadius(this.radius - 48);

        const svg = d3.select('#category-dountchart').append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');

        const subjectDountPath = svg.selectAll('g').append('g').attr('id', 'pie')
            .data(categoryPie(subjectDountData))
            .enter().append('path')
            .attr('fill', (d, i: any) => {
                return color(i);
            })
            .on('mousemove', (d: any) => {
                this.dountChartOverPop(d, 'subject-dount-tooltip');
                d3.select(d3.event.target)
                    .attr('stroke', 'white')
                    .attr('d', subjectDountOverArc);
                d3.select('#' + d.data.category_id)
                    .attr('stroke', 'white')
                    .attr('d', categoryDountOverArc);
            })
            .on('mouseout', (d: any) => {
                d3.select('#subject-dount-tooltip').style('display', 'none');
                d3.select('#' + d.data.category_id)
                    .attr('stroke', 'none')
                    .transition()
                    .duration(100)
                    .attr('d', categoryDountArc);
                d3.select(d3.event.target)
                    .attr('stroke', 'none')
                    .transition()
                    .duration(100)
                    .attr('d', subjectDountArc);
            })
            .attr('d', subjectDountArc);

        const categoryDountPath = svg.selectAll('g').append('g').attr('id', 'donut')
            .data(categoryPie(categoryDountData))
            .enter().append('path')
            .attr('id', (d: any) => d.data.id)
            .attr('fill', (d, i: any) => {
                return color(i);
            })
            .on('mousemove', (d: any) => {
                this.dountChartOverPop(d, 'category-dount-tooltip');
                d3.select(d3.event.target)
                    .attr('stroke', 'white')
                    .attr('d', categoryDountOverArc);
            })
            .on('mouseout', (d) => {
                d3.select(d3.event.target)
                    .attr('stroke', 'none')
                    .transition()
                    .duration(100)
                    .attr('d', categoryDountArc);
                d3.select('#category-dount-tooltip').style('display', 'none');
            })
            .attr('d', categoryDountArc);

    }

    /**
     * Maintain popup while hover on dount chart
     */
    private dountChartOverPop(d: any, dountId: any) {
        this.categoryDountOverData = d.data;
        return d3.select('#' + dountId)
            .style('left', (d3.event.pageX + 12) + 'px')
            .style('top', (d3.event.pageY - 10) + 'px')
            .style('display', 'block');
    }

    /**
     * Find category name by category id
     */
    private findCategoryNameById(id: any) {
        return this.partnerProfile.category_distribution.find((x: any) => x.id === id).name;
    }


}

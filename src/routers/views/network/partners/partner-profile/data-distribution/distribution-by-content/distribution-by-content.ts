import { Component, Vue, Prop } from 'vue-property-decorator';
import * as d3 from 'd3';
import { numberFormatWithTextSuffix } from '@/helpers/number-format';
import { CONTENT_TYPE, CONTENT_DISTRIBUTION } from '@/utils/constants';

@Component({
    name: 'distribution-by-content',
    components: {
    },
})

export default class DistributionByContent extends Vue {

    // ---------------------------------------------------------------------
    // Properties

    /**
     * Width of content type svg
     */
    private width: number = 300;

    /**
     * Height of content type svg
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
     * Get content types for pie chart
     */
    private constantData: any = CONTENT_TYPE;

    /**
     * Showing content type label data
     */
    private contentTypeTooltipLabel: any = null;

    /**
     * Maintain partner profile data
     */
    @Prop()
    private partnerProfile: any;

    // -----------------------------------------------------------------------
    // Hooks

    private mounted() {
        this.darwPie();
    }

    // ------------------------------------------------------------------------
    // Methods

    private darwPie() {
        const svg = d3.select('#content-distribution-piechart')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
        const ContentTypeColor = d3.scaleOrdinal(CONTENT_DISTRIBUTION.color);
        const pie: any = d3.pie()
            .value((d: any) => d.total_count);
        const contentDistributionData = pie(this.partnerProfile.content_type_distribution);
        const ContentTypeArc: any = d3.arc()
            .innerRadius(0)
            .outerRadius(this.radius);
        const contentTypeLabelArc: any = d3.arc().innerRadius(this.radius + this.margin).outerRadius(this.radius);
        const ContentTypepath = svg
            .selectAll('content-type-pie')
            .data(contentDistributionData)
            .enter();

        ContentTypepath.append('path')
            .on('mousemove', (d: any) => {
                this.contentTypeTooltipData(d);
            })
            .on('mouseout', (d: any) => {
                d3.select('#content-type-tooltip').style('display', 'none');
            })
            .attr('d', ContentTypeArc)
            .attr('fill', (d: any, i: any) => ContentTypeColor(i));

        ContentTypepath.append('text')
            .text((d: any) => numberFormatWithTextSuffix(d.data.total_count))
            .attr('transform', (d: any) => 'translate(' + contentTypeLabelArc.centroid(d) + ')')
            .attr('dy', '.35em')
            .style('text-anchor', 'middle')
            .classed('content-type-pie-text', true)
            .on('mousemove', (d: any) => {
                this.contentTypeTooltipData(d);
            })
            .on('mouseout', (d: any) => {
                d3.select('#content-type-tooltip').style('display', 'none');
            });
    }

    private numberFormatWithTextSuffix(value: number) {
        return numberFormatWithTextSuffix(value);
    }

    /**
     * Showing Tooltip while hovering pie
     */
    private contentTypeTooltipData(d: any) {
        this.contentTypeTooltipLabel = this.constantData.find((type: any) =>
            (type.type === d.data.content_type)).labelKey;
        return d3.select('#content-type-tooltip')
            .style('left', d3.event.pageX + 10 + 'px')
            .style('top', d3.event.pageY - 12 + 'px')
            .style('display', 'block');

    }

}

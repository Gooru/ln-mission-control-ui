import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import * as d3 from 'd3';

@Component({
    name: 'summary-chart',
})

export default class SummaryChart extends Vue {


  /**
   * Total count
   * @return {Number}
   */
  private get totalCount() {
    let count = 0;
    const dataSet = this.data;
    dataSet.forEach((data: any) => {
      count += data.value;
    });
    return count;
  }

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Number} width
   */
  @Prop()
  private width!: number;

  /**
   * @property {Number} height
   */
  @Prop()
  private height!: number;

  /**
   * Data of donut chart
   * @return {Array}
   */
  @Prop()
  private data!: any;


  /**
   * Inner Radius of donut chart
   * @return {Number}
   */
  @Prop()
  private innerRadius!: number;

  /**
   *  radius of donut chart
   * @return {Number}
   */
  @Prop()
  private radius!: number;


  /**
   * Inner Radius of arc two
   * @return {Number}
   */
  @Prop()
  private innerRadius1!: number;

  /**
   *  radius of arc two
   * @return {Number}
   */
  @Prop()
  private radius1!: number;

  /**
   * default label  for the dounut chart
   * @type {String}
   */
  @Prop()
  private label!: string;

  @Watch('data')
  private onChangingData(value: any) {
      this.drawchart(value);
  }


  // -------------------------------------------------------------------------
  // Methods

  private mounted() {
   this.drawchart(this.data);
  }

  private drawchart(data: any) {
    d3.select(this.$el).select('svg').remove();
    const svgConst: any = this;
    const svg = d3.select(this.$el)
      .append('svg')
      .attr('class', 'pie')
      .attr('width', this.width)
      .attr('height', this.height);

    const g = svg.append('g')
      .attr('transform', `translate(${  this.width / 2  },${  this.height / 2  })`);

    const arc: any = d3.arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.radius);

    const arc1: any = d3.arc()
      .innerRadius(this.innerRadius1)
      .outerRadius(this.radius1);

    const pie1 = d3.pie()
      .value((d: any) => {
        return d.value;
      })
      .sort(null);
    pie1.padAngle(0.05);


    const pie = d3.pie()
      .value((d: any) => {
        return d.value;
      })
      .sort(null);
    pie.padAngle(0.05);

    const arcs = g.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d: any) => {
        return d.data.colorCode;
      }).on('mouseover', (d: any) => {
        d3.select(this.$el).select(d3.event.currentElement).style('cursor', 'pointer');
        const selectedElement = d3.select(this.$el).select(`#path-arc${  d.index}`);
        selectedElement.attr('fill', d.data.colorCode);
        d3.select(this.$el).select(d3.event.currentElement).transition()
          .duration(500)
          .ease(d3.easeBounce)
          .attr('d', arc.innerRadius((svgConst.innerRadius - 5)).outerRadius(svgConst.radius));
        d3.select(this.$el).select('.header-title').text(d.data.name);
        d3.select(this.$el).select('.header-count').text(d.data.value);
      })
      .on('mouseout', () => {
        d3.select(this.$el).select(d3.event.currentElement)
          .style('cursor', 'none');
        d3.select(this.$el).selectAll('.arc1 path').attr('fill', '#FFF');
        d3.select(this.$el).select(d3.event.currentElement).transition()
          .duration(500)
          .ease(d3.easeBounce)
          .attr('d', arc.innerRadius(svgConst.innerRadius).outerRadius(svgConst.radius));
        d3.select(this.$el).select('.header-title').text(svgConst.label);
        d3.select(this.$el).select('.header-count').text(svgConst.totalCount);
      });

    const arcs1 = g.selectAll('arc1')
      .data(pie1(data))
      .enter()
      .append('g')
      .attr('class', 'arc1');
    arcs1.append('path')
      .attr('d', arc1)
      .attr('id', (d) => {
        return `path-arc${  d.index}`;
      })
      .attr('fill', '#FFF');

    const text = g.append('svg:foreignObject')
      .attr('class', 'heading')
      .attr('width', (this.width / 2))
      .attr('x', -(this.width / 4))
      .attr('y', -(this.radius / 4));
    text.append('xhtml:div')
      .attr('class', 'header-count').text(this.totalCount.toLocaleString('en-US'));
    text.append('xhtml:div')
      .attr('class', 'header-title').text(this.label);
}

}

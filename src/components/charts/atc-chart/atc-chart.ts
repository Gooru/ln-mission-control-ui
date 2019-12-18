import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import * as d3 from 'd3';

@Component({
    name: 'atc-chart',
})

export default class AtcChart extends Vue {

  // ------------------------------------------------------------------------
  // Properties
  @Prop()
  private dataList: any;

  @Watch('dataList')
  private watchData(value: any) {
    this.drawAtcChart(value);
  }

  // ------------------------------------------------------------------------
  // Hooks
  private mounted() {
    this.drawAtcChart(this.dataList);
  }


  // -------------------------------------------------------------------------
  // Methods
  private drawAtcChart(dataset: any) {
    d3.select('svg').remove();
    const margin = {
        top: 10,
        right: 20,
        bottom: 30,
        left: 50,
      };
    const width = this.$el.clientWidth - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
      .domain([
        0,
        d3.max(dataset, (d: any) => d.totalCompetencies as number) as number,
      ])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    const xAxis = d3
      .axisBottom(xScale)
      .tickPadding(10);

    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickSize(-width)
      .tickPadding(10)
      .tickFormat((d) => d + '%');

    const svg = d3
      .select(this.$el)
      .append('svg')
      .attr('class', 'navigator-atc-chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    const studentNode = svg
      .selectAll('.student-nodes')
      .data(dataset)
      .enter()
      .append('g')
      .attr('transform', (d: any) => {
        return `translate(${xScale(d.completedCompetencies) +
          12}, ${yScale(d.percentScore) - 20})`;
      })
      .attr('class', 'node-point');

    studentNode
      .append('circle')
      .attr('cx', 5)
      .attr('cy', 5)
      .attr('r', 16)
      .style('fill', (d: any) => d);

    studentNode
      .append('svg:image')
      .attr('class', 'student-profile')
      .attr('x', -7)
      .attr('y', -7)
      .attr('xlink:href' , (d: any) => {
          return d.thumbnailUrl;
        })
      .attr('width', 24)
      .attr('height', 24);
  }
}

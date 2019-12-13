import {Vue, Component} from 'vue-property-decorator';
import * as d3 from 'd3';

@Component({
    name: 'atc-chart',
})

export default class AtcChart extends Vue {

  private drawAtcChart(dataset: any) {
    const component = this;
    const margin = {
        top: 50,
        right: 20,
        bottom: 30,
        left: 50,
      };
    const width = 830 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
      .domain([
        0,
        d3.max(dataset, (d: any) => {
          return d.totalCompetencies;
        }),
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
      .tickSize(-width)
      .tickPadding(10);

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

    svg
      .append('g')
      .attr('transform', 'translate(-460, 500) rotate(-90)')
      .append('text')
      .attr('class', 'placeholder')
      .attr('x', '130')
      .attr('y', '445')
      .text(
         'edited performance',
      );

    svg
      .append('g')
      .attr('transform', 'translate(-50, -21)')
      .append('text')
      .attr('class', 'placeholder')
      .attr('x', '50')
      .attr('y', '415')
      .text(
        'label',
      );

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
      .attr({
        'xlink:href'(d: any) {
          return d.thumbnail;
        },
        'width': 24,
        'height': 24,
      });
  }
}

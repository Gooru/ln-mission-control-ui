import {Vue, Component} from 'vue-property-decorator';
import * as d3 from 'd3';

@Component({
    name: 'atc-chart',
})

export default class AtcChart extends Vue {

  // ------------------------------------------------------------------------
  // Properties

  // ------------------------------------------------------------------------
  // Hooks
  private mounted() {
    const dataSet: any = [{
      completedCompetencies: 19,
      grade: 'Grade 8',
      gradeId: 260,
      inprogressCompetencies: 0,
      percentCompletion: 7.34,
      percentScore: 17.65,
      totalCompetencies: 259,
      userId: '139ad682-8c7a-49ba-b370-b54e24296363',
    }, {
      completedCompetencies: 70,
      grade: 'Grade 8',
      gradeId: 260,
      inprogressCompetencies: 1,
      percentCompletion: 27.03,
      percentScore: 47.66,
      totalCompetencies: 259,
      userId: '4a39f558-37d9-4715-8933-3f2a5e7ab27c',
    }];
    this.drawAtcChart(dataSet);
  }


  // -------------------------------------------------------------------------
  // Methods
  private drawAtcChart(dataset: any) {
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

    // studentNode
    //   .append('svg:image')
    //   .attr('class', 'student-profile')
    //   .attr('x', -7)
    //   .attr('y', -7)
    //   .attr({
    //     'xlink:href': function(d) {
    //       return d.thumbnail;
    //     },
    //     width: 24,
    //     height: 24
    //   });
  }
}

import { Component, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';

@Component({
  name: 'gussie-charts',
})
export default class GussieCharts extends Vue {


  public mounted() {
    this.drawBarChart();
  }

  private drawBarChart() {
      const data: any = [
        { group: 'banana', Nitrogen: 12, normal: 10, stress: 20 },
        { group: 'poacee', Nitrogen: 6, normal: 10, stress: 33 },
        { group: 'sorgho', Nitrogen: 41, normal: 28, stress: 12 },
        { group: 'datas', Nitrogen: 13, normal: 70, stress: 12 },
        { group: 'news', Nitrogen: 11, normal: 48, stress: 52 },
        { group: 'news', Nitrogen: 21, normal: 58, stress: 52 },
        { group: 'triticum', Nitrogen: 19, normal: 6, stress: 1 }];

      const margin = { top: 10, right: 30, bottom: 20, left: 50 };
      const width = (data.length * 60) - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const svg = d3.select('#gussie_chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')');

      const subgroups = Object.keys(data[0]);
      const groups = d3.map(data, (d: any) => (d.group)).keys();

      const x: any = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding(.01);
      //   svg.append("g")
      //   .attr("transform", "translate(0," + height + ")")
      //   .call(d3.axisBottom(x));


      const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

      const color: any = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#e1e3e4', '#4180e0', '#a0c8f0']);

      const stackedData = d3.stack()
        .keys(subgroups)
        (data);

      svg.append('g')
        .selectAll('g')
        .data(stackedData)
        .enter().append('g')
        .attr('fill', (d: any) => color(d.key))
        .selectAll('rect')
        .data( (d: any) =>  d)
        .enter().append('rect')
        .attr('x', (d: any) =>  x(d.data.group))
        .attr('y', (d: any) => y(d[1] ? d[1] : 0))
        .attr('height', (d: any) => y(d[0] ? d[0] : 0) - y(d[1] ? d[1] : 0))
        .attr('width', x.bandwidth());

  }


}

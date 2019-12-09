import {Component, Vue} from 'vue-property-decorator';
import TexasLineChart from '@/components/charts/texas-line-chart/texas-line-chart';

@Component({
    name: 'texas',
    components: {
        'texas-line-chart': TexasLineChart,
    },
})

export default class Texas extends Vue {

}

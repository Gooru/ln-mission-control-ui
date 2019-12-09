import {Component, Vue} from 'vue-property-decorator';
import TexasLineChart from '@/components/charts/texas-line-chart/texas-line-chart';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
    name: 'texas-chart',
    components: {
        'texas-line-chart': TexasLineChart,
        'material-icon': GoogleMaterialIcon,
    },
})

export default class TexasChart extends Vue {

}

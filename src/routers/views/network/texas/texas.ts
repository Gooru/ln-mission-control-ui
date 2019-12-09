import {Component, Vue} from 'vue-property-decorator';
import TexasDistrictCard from './texas-district-card/texas-district-card';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import TexasChart from './texas-chart/texas-chart';

@Component({
    name: 'texas',
    components: {
        'texas-chart': TexasChart,
        'texas-district-card': TexasDistrictCard,
        'material-icon': GoogleMaterialIcon,
    },
})

export default class Texas extends Vue {

}

import {Component, Vue} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
    name: 'performance-by-grade',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class PerformanceByGrade extends Vue {
    private itrate: any = ['0%', '10%', '30%', '40%', '50%', '60%', '30%', '40%', '50%' ];
}

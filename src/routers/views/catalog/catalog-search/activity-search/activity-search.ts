import { Vue, Component } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import MCIcon from '@/components/icons/mc-icon/mc-icon';

@Component({
    name: 'activity-search',
    components: {
        'material-icon': GoogleMaterialIcon,
        'mc-icon': MCIcon,
    },
})

export default class ActivitySearch extends Vue {

}

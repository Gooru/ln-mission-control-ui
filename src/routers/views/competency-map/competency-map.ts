import {Vue, Component} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
    name: 'competency-map',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class CompetencyMap extends Vue {

}

import {Vue, Component} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
    name: 'comparative-search',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class ComparativeSearch extends Vue {

}

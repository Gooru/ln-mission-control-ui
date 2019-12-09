import {Component, Vue} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';


@Component({
    name: 'texas-district-card',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class TexasDistrictCard extends Vue {

    private counts: any = [1, 3, 4, 5, 6];
}

import {Vue, Component, Prop} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
    name: 'activity-content',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class ActivityContent extends Vue {

    @Prop()
    private activeComponent: any;

}

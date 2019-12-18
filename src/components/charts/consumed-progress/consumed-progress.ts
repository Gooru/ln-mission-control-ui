import {Component, Vue, Prop} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
    name: 'consumed-progress',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class ConsumedProgress extends Vue {

    @Prop()
    private width?: string;
    @Prop()
    private color?: string;
    @Prop()
    private count?: string;
    @Prop()
    private tradeCount?: string;
    @Prop()
    private isHigh?: boolean;
    @Prop()
    private icon?: boolean;


}

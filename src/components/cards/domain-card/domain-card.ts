import { Vue, Component, Prop } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
    name: 'domain-card',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class DomainCard extends Vue {

    // ------------------------------------------------------
    // Properties
    @Prop()
    private domainList: any;

}

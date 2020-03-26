import {Vue, Component, Prop} from 'vue-property-decorator';
import { isMicroStandardId, getTaxonomyTags } from '@/utils/utils';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import TaxonomyCard from '../taxonomy-card/taxonomy-card';

@Component({
    name: 'lesson-card',
    components: {
        'material-icon': GoogleMaterialIcon,
        'taxonomy-card': TaxonomyCard,
    },
})

export default class ResourceCard extends Vue {

    // ------------------------------------------------------------------
    // Properties
    @Prop()
    private resource: any;

    private get tags() {
        return this.resource.standards;
    }
}

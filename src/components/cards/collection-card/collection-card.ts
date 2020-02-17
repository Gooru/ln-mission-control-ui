import { Vue, Component, Prop } from 'vue-property-decorator';
import { isMicroStandardId, getTaxonomyTags } from '@/utils/utils';
import TaxonomyCard from '../taxonomy-card/taxonomy-card';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
    name: 'collection-card',
    components: {
        'material-icon': GoogleMaterialIcon,
        'taxonomy-card': TaxonomyCard,
    },
})

export default class CollectionCard extends Vue {
    // ------------------------------------------------------------------------
    // Properties
    @Prop()
    private collection: any;

    private get tags() {
        return this.collection.standards;
    }

}

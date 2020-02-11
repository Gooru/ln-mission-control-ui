import { Vue, Component, Prop } from 'vue-property-decorator';
import { isMicroStandardId, getTaxonomyTags } from '@/utils/utils';

@Component({
    name: 'collection-card',
    components: {

    },
})

export default class CollectionCard extends Vue {
    // ------------------------------------------------------------------------
    // Properties
    @Prop()
    private collection: any;

    get tags() {
        let standards = this.collection.standards;
        if (standards) {
        standards = standards.filter((standard: any) => {
            // Filter out learning targets (they're too long for the card)
            return isMicroStandardId(standard.get('id'));
        });
        return getTaxonomyTags(standards);
        }
    }
}

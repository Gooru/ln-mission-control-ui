import {Vue, Component, Prop} from 'vue-property-decorator';
import { isMicroStandardId, getTaxonomyTags } from '@/utils/utils';

@Component({
    name: 'unit-card',
    components: {

    },
})

export default class UnitCard extends Vue {

    // ------------------------------------------------------------------
    // Properties
    @Prop()
    private unit: any;

    get tags() {
        let standards = this.unit.standards;
        if (standards) {
        standards = standards.filter((standard: any) => {
            // Filter out learning targets (they're too long for the card)
            return isMicroStandardId(standard.get('id'));
        });
        return getTaxonomyTags(standards);
        }
    }
}

import {Vue, Component, Prop} from 'vue-property-decorator';
import { isMicroStandardId, getTaxonomyTags } from '@/utils/utils';
import TaxonomyCard from '../taxonomy-card/taxonomy-card';

@Component({
    name: 'unit-card',
    components: {
        'taxonomy-card': TaxonomyCard,
    },
})

export default class UnitCard extends Vue {

    // ------------------------------------------------------------------
    // Properties
    @Prop()
    private unit: any;

    private get tags() {
        return this.unit.standards;
    }
}

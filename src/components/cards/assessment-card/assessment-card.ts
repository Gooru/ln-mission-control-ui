import { Vue, Component, Prop } from 'vue-property-decorator';
import { isMicroStandardId, getTaxonomyTags } from '@/utils/utils';
import TaxonomyCard from '../taxonomy-card/taxonomy-card';
import { AssessmentModel } from '@/models/content/assessment';

@Component({
    name: 'assesment-card',
    components: {
        'taxonomy-card': TaxonomyCard,
    },
})

export default class AssessmentCard extends Vue {
    // ------------------------------------------------------------------------
    // Properties
    @Prop()
    private assessment: any;

    private get tags() {
        return this.assessment.standards;
    }

}

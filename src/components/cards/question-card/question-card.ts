import {Vue, Component, Prop} from 'vue-property-decorator';
import { isMicroStandardId, getTaxonomyTags } from '@/utils/utils';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import TaxonomyCard from '../taxonomy-card/taxonomy-card';

@Component({
    name: 'question-card',
    components: {
        'material-icon': GoogleMaterialIcon,
        'taxonomy-card': TaxonomyCard,
    },
})

export default class QuestionCard extends Vue {

    // ------------------------------------------------------------------
    // Properties
    @Prop()
    private question: any;

    get tags() {
        return this.question.standards;
    }
}

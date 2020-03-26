import {Vue, Component, Prop} from 'vue-property-decorator';
import { isMicroStandardId, getTaxonomyTags } from '@/utils/utils';
import TaxonomyCard from '../taxonomy-card/taxonomy-card';

@Component({
    name: 'lesson-card',
    components: {
        'taxonomy-card': TaxonomyCard,
    },
})

export default class LessonCard extends Vue {

    // ------------------------------------------------------------------
    // Properties
    @Prop()
    private lesson: any;

    get tags() {
        return this.lesson.standards;
    }
}

import {Vue, Component, Prop} from 'vue-property-decorator';
import { isMicroStandardId, getTaxonomyTags } from '@/utils/utils';
import TaxonomyCard from '../taxonomy-card/taxonomy-card';

@Component({
    name: 'course-card',
    components: {
        'taxonomy-card': TaxonomyCard,
    },
})

export default class CourseCard extends Vue {

    // ------------------------------------------------------------------
    // Properties
    @Prop()
    private course: any;

    private isHideCoursePerf: boolean = false;

    get tags() {
        return this.course.standards;
    }
}

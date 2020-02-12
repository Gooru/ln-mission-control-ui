import { Vue, Component, Prop } from 'vue-property-decorator';
import CollectionCard from '../collection-card/collection-card';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import UnitCard from '../unit-card/unit-card';
import LessonCard from '../lesson-card/lesson-card';
import ResourceCard from '../resource-card/resource-card';
import CourseCard from '../course-card/course-card';
import QuestionCard from '../question-card/question-card';
import AssessmentCard from '../assessment-card/assessment-card';

@Component({
    name: 'learning-map-content',
    components: {
        'collection-card': CollectionCard,
        'material-icon': GoogleMaterialIcon,
        'unit-card': UnitCard,
        'lesson-card': LessonCard,
        'resource-card': ResourceCard,
        'course-card': CourseCard,
        'question-card': QuestionCard,
        'assessment-card': AssessmentCard,
    },
})

export default class LearningMapContent extends Vue {
    // -----------------------------------------------------------------------------
    // Properties
    @Prop()
    private learningMapContent: any;

    @Prop()
    private selectedContent: any;

    get selectedContentList() {
        return this.learningMapContent.contents ?
            this.learningMapContent.contents[this.selectedContent] : [];
    }

    // -------------------------------------------------------------------------------
    // Actions

    private onClose() {
        this.$emit('onClose');
    }
}

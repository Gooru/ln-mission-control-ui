import { Vue, Component, Watch } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import axios from 'axios';
import { SubjectModel } from '@/models/taxonomy/subject';
import { ClassificationModel } from '@/models/taxonomy/classification';
import { taxonomyAPI } from '@/providers/apis/taxonomy/taxonomy';
import { sessionService } from '@/providers/services/auth/session';

@Component({
    name: 'competency-map',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class CompetencyMap extends Vue {

    private subjectList?: any = [];

    private selectedCategory: any = {};

    private selectedSubject: any = {};

    private defaultCategoryId: string = 'k_12';

    private defaultSubjectCode: string = 'K12.MA';

    private categories?: ClassificationModel[] = [];

    @Watch('subjectList')
    private createAvatar(subjects: any) {
        if (subjects.length) {
            subjects.map((subject: any) => {
                subject.color = '#' + (Math.random().toString(16).slice(-6));
            });
        }
    }

    private userId() {
        const session = sessionService.getSession();
        return session ? session.user_id : '';
    }

    private onSelectCategory(category: any) {
        this.selectedCategory = category;
        this.subjectsByCategory(category.id)
            .then((subjects) => {
                this.subjectList = subjects;
            });
    }

    private created() {
        this.fetchTaxonomyData();
    }

    private fetchTaxonomyData() {
        axios.all([
            taxonomyAPI.fetchTaxonomyClassifications(),
            this.subjectsByCategory(this.defaultCategoryId),

        ]).then(axios.spread((classifications, subjects) => {
            this.categories = classifications;
            this.subjectList = subjects;
            this.selectedCategory = this.categories.find((category) => category.id === this.defaultCategoryId);
        }));
    }

    private subjectsByCategory(categoryId: string) {
        return taxonomyAPI.fetchTaxonomySubjects(categoryId);
    }

}

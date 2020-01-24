import { Vue, Component, Watch } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import axios from 'axios';
import { SubjectModel } from '@/models/taxonomy/subject';
import { ClassificationModel } from '@/models/taxonomy/classification';
import { taxonomyAPI } from '@/providers/apis/taxonomy/taxonomy';
import { sessionService } from '@/providers/services/auth/session';
import moment from 'moment';
import { competencyAPI } from '@/providers/apis/competency/competency';
import { DomainModel } from '@/models/proficiency/domain';
import { CompetencyModel } from '@/models/proficiency/competency';
import CompetencyChartCard from '@/components/charts/competency-chart-card/competency-chart-card';

@Component({
    name: 'competency-map',
    components: {
        'material-icon': GoogleMaterialIcon,
        'competency-bar-chart': CompetencyChartCard,
    },
})

export default class CompetencyMap extends Vue {

    // ---------------------------------------------------------------------
    // Properties

    private subjectList?: SubjectModel[] | any = [];

    private selectedCategory: any = {};

    private selectedSubject: any = {};

    private defaultCategoryId: string = 'k_12';

    private defaultSubjectCode: string = 'K12.MA';

    private categories?: ClassificationModel[] = [];

    private isShowProficiencyChart: boolean = false;

    @Watch('subjectList')
    private createAvatar(subjects: any) {
        if (subjects.length) {
            subjects.map((subject: any) => {
                subject.color = '#' + (Math.random().toString(16).slice(-6));
            });
        }
    }

    // -----------------------------------------------------------------------------
    // Actions

    private onSelectCategory(category: any) {
        this.selectedCategory = category;
        this.subjectsByCategory(category.id)
            .then((subjects) => {
                this.subjectList = subjects;
            });
    }

    private onSelectSubject(subject: any) {
        this.isShowProficiencyChart = true;

    }

    // ------------------------------------------------------------------------------
    // Hooks

    private created() {
        this.fetchTaxonomyData();
    }

    // -----------------------------------------------------------------------------
    // Methods

    private fetchTaxonomyData() {
        const classificationPromise = taxonomyAPI.fetchTaxonomyClassifications();
        const subjectPromise = this.subjectsByCategory(this.defaultCategoryId);
        axios.all([
            classificationPromise,
            subjectPromise,
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

import { Component, Vue } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import axios from 'axios';
import { taxonomyAPI } from '@/providers/apis/taxonomy/taxonomy';
import { SubjectModel } from '@/models/taxonomy/subject';
import { ClassificationModel } from '@/models/taxonomy/classification';

@Component({
    name: 'learners-competency-filter',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class LearnersCompetencyFilter extends Vue {

    // --------------------------------------------------------------
    // Properties

    /**
     * @property {boolean} showDropdown helps to maitain dropdown list
     */
    private showDropdown: boolean = false;


    private defaultCategoryId: string = 'k_12';

    private defaultSubjectCode: string = 'K12.MA';

    private categories: ClassificationModel[] = [];

    private subjects: SubjectModel[] = [];

    private activeCategory!: ClassificationModel;

    private activeSubject!: SubjectModel;

    // ----------------------------------------------------------------
    // Hooks

    public created() {
        this.subjectFilterData();
    }


    // -----------------------------------------------------------------
    // Actions

    private onChangeCategory(category: any) {
        this.activeCategory = category;

        this.fetchTaxonomySubjects(category.id).then((subjects) => {
            this.subjects = subjects;
        });
    }


    // ------------------------------------------------------------------
    // Methods

    private subjectFilterData() {
        const component = this;
        axios.all([
            taxonomyAPI.fetchTaxonomyClassifications(),
            component.fetchTaxonomySubjects(),
            ]).then(axios.spread((subjectClassifications: any, taxonomySubjects: any) =>  {
            component.categories = subjectClassifications;
            component.subjects = taxonomySubjects;
            component.activeSubject = taxonomySubjects.find((subject: any) =>
                subject.code === component.defaultSubjectCode,
            );
            component.activeCategory = subjectClassifications.find(
                (category: any) => category.id === component.defaultCategoryId,
            );
            }));
    }

    private fetchTaxonomySubjects(subjectId: string = '') {
        const component = this;
        return taxonomyAPI.fetchTaxonomySubjects(subjectId || component.defaultCategoryId);
      }

}

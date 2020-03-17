import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
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

    @Prop()
    private defaultCategoryId?: any;

    private defaultSubjectCode: string = '';

    private categories?: ClassificationModel[] = [];

    private userId() {
        const session = sessionService.getSession();
        return session ? session.user_id : '';
    }

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
        if (category) {
            this.$emit('onChangeCategoryId', category.id);
        }
        this.subjectsByCategory(category.id)
            .then((subjects) => {
                this.subjectList = subjects;
            });
    }

    private onSelectSubject(subject: any) {
        this.$emit('onSelectSubject', subject, this.userId());
    }

    // ------------------------------------------------------------------------------
    // Hooks

    private created() {
        this.fetchTaxonomyData();
    }

    // -----------------------------------------------------------------------------
    // Methods

    private fetchTaxonomyData() {
        taxonomyAPI.fetchTaxonomyClassifications().then((classifications) => {
            let defaultCategory = this.defaultCategoryId;
            if (!this.defaultCategoryId || this.defaultCategoryId === '') {
                defaultCategory = classifications.length ? classifications[0].id : '';
                this.$emit('onChangeCategoryId', defaultCategory);
            }
            this.categories = classifications;
            this.subjectsByCategory(defaultCategory).then((subjects) => {
                this.subjectList = subjects;
                this.selectedCategory = classifications ?
                    classifications.find((category) => category.id === defaultCategory) : null;
            });
        });
    }

    private subjectsByCategory(categoryId: string) {
        return taxonomyAPI.fetchTaxonomySubjects(categoryId);
    }


}

import { Component, Vue, Prop } from 'vue-property-decorator';
import LearnerProficiencyChart from '@/components/charts/learner-proficiency-chart/learner-proficiency-chart';
import SubjectInfoPanel from '@/components/proficiency/subject-info-panel/subject-info-panel';
import DomainsListPanel from '@/components/proficiency/domains-list-panel/domains-list-panel';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { SubjectModel } from '@/models/taxonomy/subject';
import { ClassificationModel } from '@/models/taxonomy/classification';
import { taxonomyAPI } from '@/providers/apis/taxonomy/taxonomy';
import axios from 'axios';

@Component({
  name: 'learner-proficiency',
  components: {
    'learner-proficiency-chart': LearnerProficiencyChart,
    'domains-list-panel': DomainsListPanel,
    'google-material-icon': GoogleMaterialIcon,
    'subject-info-panel': SubjectInfoPanel,
  },
})
export default class LearnerProficiency extends Vue {

  private categories!: ClassificationModel[];

  private subjects!: SubjectModel[];

  private defaultCategoryId: string = 'k_12';

  private defaultSubjectCode: string = 'K12.MA';

  @Prop()
  private activeCategory!: ClassificationModel;

  @Prop()
  private activeSubject!: SubjectModel;

  private isShowCategories: boolean = false;

  private isShowSubjects: boolean = false;

  public created() {
    this.loadTaxonomyData();
  }

  public onSelectCategory(category: ClassificationModel) {
    const component = this;
    component.activeCategory = category;
    component.fetchTaxonomySubjects(category.id).then((taxonomySubjects: SubjectModel[]) => {
      component.subjects = taxonomySubjects;
      component.activeSubject = taxonomySubjects[0];
    });
    component.isShowCategories = false;
  }

  public onSelectSubject(subject: SubjectModel) {
    const component = this;
    component.activeSubject = subject;
    component.isShowSubjects = false;
  }

  public loadTaxonomyData() {
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

import { Component, Vue } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import axios from 'axios';
import { taxonomyAPI } from '@/providers/apis/taxonomy/taxonomy';
import { SubjectModel } from '@/models/taxonomy/subject';
import { ClassificationModel } from '@/models/taxonomy/classification';

@Component({
  name: 'taxonomy-filter',
  components: {
    'material-icon': GoogleMaterialIcon,
  },
  filters: {
    extractClassification(subjectCode: string) {
      return subjectCode ? subjectCode.split('.')[0] : '';
    },
  },
})

export default class TaxonomyFilter extends Vue {

  // --------------------------------------------------------------
  // Properties

  private showDropdown: boolean = false;

  private defaultClassificationId: string = 'k_12';

  private classifications: ClassificationModel[] = [];

  private subjects: SubjectModel[] = [];

  private activeClassification!: ClassificationModel;

  private selectedSubjects: SubjectModel[] = [];

  // ----------------------------------------------------------------
  // Hooks

  public created() {
    this.loadTaxonomyData();
  }


  // -----------------------------------------------------------------
  // Actions

  private onSelectClassification(classification: ClassificationModel) {
    this.activeClassification = classification;
    this.loadTaxonomySubjects(classification.id);
  }

  private onSelectSubject(subject: SubjectModel) {
    const component = this;
    const selectedSubjects = component.selectedSubjects;
    const existingSubject: SubjectModel | any = selectedSubjects.find(
      (selectedSubject: SubjectModel) => subject.id === selectedSubject.id);
    subject.isActive = !subject.isActive;
    const selectedSubjectIndex =  selectedSubjects.indexOf(existingSubject);
    if (selectedSubjectIndex > -1) {
      selectedSubjects.splice(selectedSubjectIndex, 1);
    } else {
      selectedSubjects.push(subject);
    }
    component.selectedSubjects = selectedSubjects;
  }

  private onApplyFilters() {
    this.$emit('listActiveFacets', this.selectedSubjects);
  }


  // ------------------------------------------------------------------
  // Methods

  private loadTaxonomyData() {
    const component = this;
    taxonomyAPI.fetchTaxonomyClassifications().then((taxonomyClassifications: ClassificationModel[]) =>  {
      component.classifications = taxonomyClassifications;
      const defaultClassification: ClassificationModel | any = taxonomyClassifications.find(
        (classification: ClassificationModel) => classification.id === component.defaultClassificationId,
      );
      component.loadTaxonomySubjects(defaultClassification.id).then((taxonomySubjects: SubjectModel[]) => {
        component.selectedSubjects = (JSON.parse(JSON.stringify(taxonomySubjects)));
        component.$emit('listActiveFacets', taxonomySubjects);
      });
      component.activeClassification = defaultClassification;
    });
  }

  private loadTaxonomySubjects(classificationCode: string) {
    const component = this;
    return taxonomyAPI.fetchTaxonomySubjects(classificationCode).then((taxonomySubjects: SubjectModel[]) => {
      component.subjects = taxonomySubjects;
      return taxonomySubjects;
    });
  }

}

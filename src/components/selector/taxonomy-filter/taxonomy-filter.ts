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

  private isShowFilterBody: boolean = false;

  private defaultClassificationId: string = 'k_12';

  private classifications: ClassificationModel[] = [];

  private subjects: SubjectModel[] = [];

  private activeClassification!: ClassificationModel;

  private selectedSubjects: SubjectModel[] = [];

  private defaultOrderOfFacets: any = [
    'K12.SS',
    'K12.MA',
    'K12.ELA',
    'K12.SC',
  ];

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
    this.isShowFilterBody = false;
  }


  // ------------------------------------------------------------------
  // Methods

  private loadTaxonomyData() {
    const component = this;
    taxonomyAPI.fetchTaxonomyClassifications().then((taxonomyClassifications: ClassificationModel[]) =>  {
      component.classifications = taxonomyClassifications;
      let defaultClassification: ClassificationModel | any = taxonomyClassifications.find(
        (classification: ClassificationModel) => classification.id === component.defaultClassificationId,
      );
      defaultClassification = defaultClassification || taxonomyClassifications[0];
      component.loadTaxonomySubjects(defaultClassification.id).then((taxonomySubjects: SubjectModel[]) => {
        taxonomySubjects.forEach((subject: SubjectModel) => {
          subject.isActive = true;
        });
        const parsedSubjects =  (JSON.parse(JSON.stringify(taxonomySubjects)));
        // When default classification is not available
        if (defaultClassification.id === component.defaultClassificationId) {
          component.defaultOrderOfFacets.map((subjectCode: string) => {
            component.selectedSubjects.push(
              parsedSubjects.find( (subject: any) => subject.code === subjectCode),
            );
          });
        } else {
          component.selectedSubjects = parsedSubjects;
        }
        component.$emit('listActiveFacets', component.selectedSubjects);
      });
      component.activeClassification = defaultClassification;
    });
  }

  private loadTaxonomySubjects(classificationCode: string) {
    const component = this;
    return taxonomyAPI.fetchTaxonomySubjects(classificationCode).then((taxonomySubjects: SubjectModel[]) => {
      component.subjects = taxonomySubjects;
      const selectedSubjects = component.selectedSubjects;
      selectedSubjects.map( (selectedSubject: SubjectModel) => {
        const existingSubject = taxonomySubjects.find((subject: SubjectModel) => selectedSubject.code === subject.code);
        if (existingSubject) {
          existingSubject.isActive = true;
        }
      });
      return taxonomySubjects;
    });
  }

}

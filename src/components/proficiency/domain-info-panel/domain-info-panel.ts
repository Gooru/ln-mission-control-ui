import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ComepetencyInfoPanel from '@/components/proficiency/competency-info-panel/competency-info-panel';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { SubjectModel } from '@/models/taxonomy/subject';
import { ClassificationModel } from '@/models/taxonomy/classification';
import { DomainModel } from '@/models/proficiency/domain';

@Component({
  name: 'domain-info-panel',
  components: {
    'competency-info-panel': ComepetencyInfoPanel,
    'google-material-icon': GoogleMaterialIcon,
  },
})
export default class DomainInfoPanel extends Vue {

  @Prop()
  public domain!: any;

  @Prop()
  public subject!: SubjectModel;

  @Prop()
  public classification!: ClassificationModel;

  public activeCompetency!: any;

  public isShowCompetencyPanel: boolean = false;

  public onSelectCompetency(competency: any) {
    const component = this;
    component.activeCompetency = competency;
    component.isShowCompetencyPanel = true;
  }

  public onCloseCompetencyInfoPanel() {
    this.isShowCompetencyPanel = false;
  }
}

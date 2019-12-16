import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import {DomainModel} from '@/models/proficiency/domain';
import CompetencyInfoPanel from '@/components/proficiency/competency-info-panel/competency-info-panel';

@Component({
  name: 'competencies-list-panel',
  components: {
    'competency-info-panel': CompetencyInfoPanel,
  },
})

export default class CompetenciesListPanel extends Vue {

  get competencies() {
    return this.domain.competencies || [];
  }

  public activeCompetency!: any;

  public isShowCompetencyPanel: boolean = false;

  @Prop()
  private domain!: DomainModel;

  @Prop()
  private userId!: string;

  @Prop()
  private month!: string;

  @Prop()
  private year!: string;

  public onSelectCompetency(competency: any) {
    const component = this;
    component.activeCompetency = competency;
    component.isShowCompetencyPanel = true;
  }

  public onCloseCompetencyInfoPanel() {
    this.isShowCompetencyPanel = false;
  }
}

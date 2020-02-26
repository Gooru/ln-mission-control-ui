import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
  name: 'facets-list-panel',
  components: {
    'google-material-icon': GoogleMaterialIcon,
  },
})
export default class FacetsListPanel extends Vue {

  @Prop()
  private facetsCompetencyMatrix!: any;

  private isShowCompetencyDetails: boolean = false;

}

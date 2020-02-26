import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import PortfolioStatCard from '@/components/cards/portfolio-stat-card/portfolio-stat-card';

@Component({
  name: 'facets-list-panel',
  components: {
    'google-material-icon': GoogleMaterialIcon,
    'portfolio-stat-card': PortfolioStatCard,
  },
})
export default class FacetsListPanel extends Vue {

  @Prop()
  private facetsCompetencyMatrix!: any;

  private isShowCompetencyDetails: boolean = false;

  private onSelectPortfolioStat(portfolioStat: any) {
    this.$emit('onSelectPortfolioStat', portfolioStat);
  }

}

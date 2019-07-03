import { Component, Vue } from 'vue-property-decorator';
import { partnersAPI } from '@/providers/apis/partners/partners';
import { PartnersModel } from '@/models/partners/partners';

@Component({
  name: 'partners',
})
export default class Partners extends Vue {

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Maintains the list of partners
   */
  private partners: PartnersModel | null = null;

  // -------------------------------------------------------------------------
  // Hooks

  private mounted() {
    partnersAPI.getPartners().then((response) => {
      this.partners = response;
    });
  }
}

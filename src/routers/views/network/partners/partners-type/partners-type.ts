import { Component, Vue } from 'vue-property-decorator';
import { partnersAPI } from '@/providers/apis/partners/partners';
import { CountryModel } from '@/models/partners/country';
import { PartnerModel } from '@/models/partners/partner';
import McIcon from '@/components/icons/mc-icon/mc-icon';
import { numberFormat } from '@/helpers/number-format';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import FontAwesomeIcon from '@/components/icons/font-awesome-icon/font-awesome-icon';
import { PARTNERS_TYPE } from '@/utils/constants';

@Component({
    name: 'partners-type',
    components: {
        'google-material-icon': GoogleMaterialIcon,
        'font-awesome-icon': FontAwesomeIcon,
        'mc-icon': McIcon,
    },
})
export default class PartnersType extends Vue {

    // -------------------------------------------------------------------------
    // Properties

    /**
     * Maintains partner type meta data values
     */
    private partnerType: { labelKey: string } = { labelKey: '' };

    /**
     * Maintains  the list of partners associated with the partner type.
     */
    private partners: PartnerModel[] = new Array();


    // -------------------------------------------------------------------------
    // Actions

    private back() {
        this.$router.back();
    }

    // -------------------------------------------------------------------------
    // Hooks

    private mounted() {
        this.initializeData();
    }

    // -------------------------------------------------------------------------
    // Methods

    private initializeData() {
        const partnerType = this.$route.params.type;
        const partnerTypeData = PARTNERS_TYPE.find((type) => (type.pathname === partnerType));
        if (partnerTypeData) {
            this.partnerType.labelKey = partnerTypeData.labelKey;
            partnersAPI.getPartnersByType(partnerTypeData.type).then((response) => {
                this.partners = response;
            });
        }
    }

    private getFirstCountryFromIndex(countries: CountryModel[]): string {
        const country: CountryModel = countries[0];
        return country ? country.name : '';
    }

    private numberFormat(value: number) {
        return numberFormat(value);
    }


}

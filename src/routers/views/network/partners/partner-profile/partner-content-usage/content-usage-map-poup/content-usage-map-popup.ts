import { Component, Vue, Prop } from 'vue-property-decorator';
import { numberFormatWithTextSuffix } from '@/helpers/number-format';
import { CONTENT_TYPE } from '@/utils/constants';
import McIcon from '@/components/icons/mc-icon/mc-icon';
@Component({
    name: 'content-usage-map-popup',
    components: {
        'mc-icon': McIcon,
    },
})

export default class ContentUsageMapPopup extends Vue {

    // ---------------------------------------------------------
    // Properties

    /**
     * Getting available country
     */
    private filterByCountry: any = null;

    /**
     * Maintain active country data
     */
    @Prop()
    private activeCountry: any;

    /**
     * Maintain partner profile data
     */
    @Prop()
    private partnerProfile: any;

    /**
     * Maintains content type data constant
     */
    private contentTypeData: any = CONTENT_TYPE;

    /**
     * Total count of the content type
     */
    private totalContentTypeCount: number = 0;
    // -----------------------------------------------------------
    // Hookes

    private created() {
        const country_code = this.activeCountry.country_code;
        this.filterByCountry = this.partnerProfile.content_type_stats.filter((x: any) => {
            return x.country_code === country_code;
        });

        this.sumContentType();
    }

    // -------------------------------------------------------------
    // Methods

    private numberFormatWithTextSuffix(value: number) {
        return numberFormatWithTextSuffix(value);
    }

    /**
     * Find content type total count by its type
     */
    private contentFindByType(value: any) {
        return this.filterByCountry.find((x: any) =>
            x.content_type === value) ? this.filterByCountry.find((x: any) =>
                x.content_type === value).total_count : 0;
    }

    private sumContentType() {
        if (this.filterByCountry.length) {
            this.totalContentTypeCount = (this.filterByCountry.map((o: any) => o.total_count)
                .reduce((a: any, c: any) => a + c));
        }
    }


}

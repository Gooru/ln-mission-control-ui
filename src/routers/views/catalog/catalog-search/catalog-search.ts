import { Vue, Component } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import ActivitySearch from './activity-search/activity-search';
import ContentLoder from '@/components/cards/content-loader/content-loader';
import ComparativeSearch from './comparative-search/comparative-search';

@Component({
    name: 'catalog-search',
    components: {
        'material-icon': GoogleMaterialIcon,
         ActivitySearch,
         ComparativeSearch,
        'content-loader': ContentLoder,
    },
})

export default class CatalogSearch extends Vue {

    // ------------------------------------------------------------------
    // Properties

    private get searchComponent() {
        return this.isComparativeSearch ? 'ComparativeSearch' : 'ActivitySearch';
    }

    private isComparativeSearch: boolean = false;

    private filterParams: any = {
        q: '*',
    };

    // ---------------------------------------------------------------------------
    // Actions

    private switchSearch() {
        this.isComparativeSearch = !this.isComparativeSearch;
    }
}

import { Vue, Component } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import ActivitySearch from './activity-search/activity-search';
import ContentLoder from '@/components/cards/content-loader/content-loader';

@Component({
    name: 'catalog-search',
    components: {
        'material-icon': GoogleMaterialIcon,
        'activity-search': ActivitySearch,
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

}

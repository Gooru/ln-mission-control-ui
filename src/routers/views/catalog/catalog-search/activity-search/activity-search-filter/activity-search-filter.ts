import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { DEFAULT_ACTIVITY_FILTERS, ACTIVITY_FILTER } from '@/utils/constants';
import ActivitySearchFilterAccordion from './activity-search-filter-accordion/activity-search-filter-accordion';

@Component({
    name: 'activity-search-filter',
    components: {
        'material-icon': GoogleMaterialIcon,
        'activity-search-filter-accordion': ActivitySearchFilterAccordion,
    },
})

export default class ActivitySearchFilter extends Vue {

    // ------------------------------------------------------------------------
    // Properties
    @Prop()
    private filterList?: any;

    private enableOtherFilter: boolean = false;

    private defaultActivityFilter: any = DEFAULT_ACTIVITY_FILTERS;

    private activityFilter: any = ACTIVITY_FILTER;

    private created() {
        this.$store.dispatch('activityStore/fetchCategory');
    }

    private onSelectCategory(list: any, filter: any) {
        this.enableOtherFilter = filter.code === 'category' ? false : true;
        this.$emit('onSelectCategory', list, filter);
    }


}

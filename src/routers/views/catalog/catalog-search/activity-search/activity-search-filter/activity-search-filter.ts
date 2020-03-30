import {Vue, Component, Prop} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { DEFAULT_ACTIVITY_FILTERS } from '@/utils/constants';
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

    private defaultActivityFilter: any = DEFAULT_ACTIVITY_FILTERS;

    private created() {
        this.$store.dispatch('activityStore/fetchCategory');
    }



}

import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { DEFAULT_ACTIVITY_FILTERS, ACTIVITY_FILTER } from '@/utils/constants';
import ActivitySearchFilterAccordion from './activity-search-filter-accordion/activity-search-filter-accordion';
import CenturySkills from '@/components/cards/century-skills/century-skills';

@Component({
    name: 'activity-search-filter',
    components: {
        'material-icon': GoogleMaterialIcon,
        'activity-search-filter-accordion': ActivitySearchFilterAccordion,
        'century-skills': CenturySkills,
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

    private get showCentury() {
        return this.activityFilter.find((item: any) => item.code === '21-century-skills' && item.isActive);
    }

    private created() {
        this.$store.dispatch('activityStore/fetchCategory');
    }

    private onSelectCategory(list: any, filter: any) {
        this.enableOtherFilter = filter.code === 'category' ? false : true;
        this.$emit('onSelectCategory', list, filter);
    }


}

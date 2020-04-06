import { Vue, Component, Watch } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import MCIcon from '@/components/icons/mc-icon/mc-icon';
import ActivitySearchFilter from './activity-search-filter/activity-search-filter';
import FilterCard from '@/components/cards/filter-card/filter-card';
import { CATALOG_MENUS } from '@/utils/constants';

@Component({
    name: 'activity-search',
    components: {
        'material-icon': GoogleMaterialIcon,
        'mc-icon': MCIcon,
        'activity-search-filter': ActivitySearchFilter,
        'filter-card': FilterCard,
    },
})

export default class ActivitySearch extends Vue {

    // --------------------------------------------------------------------------------
    // Properties

    private activityTabs: any = CATALOG_MENUS;

    private searchTerms: string = '';

    private isSearchTerms: boolean = false;

    private filterList: any = {};

    private isShowFilterDropdown: boolean = false;

    // ----------------------------------------------------------------------------------
    // Actions
    private onSearch() {
        if (this.searchTerms !== '') {
            this.isSearchTerms = true;
        }
    }

    private clearSearchBox() {
        this.isSearchTerms = false;
        this.searchTerms = '';
    }


    private onSelectCategory(category: any, filter: any) {
        if (filter.code === 'category' || filter.code === 'subject') {
             this.filterList = this.resetCheckbox(filter);
             if (!category.checked) {
                return;
             }
        }
        this.$set(this.filterList, filter.code, category);
    }

    private onClearItem(item: any) {
        item.checked = false;
        if (item.type === 'category' || item.type === 'subject') {
                const activeList = this.resetCheckbox(item);
                this.$set(this, 'filterList', activeList);
            } else {
                item.checked = false;
                const activeList = (this.filterList[item.type]).filter((items: any) => items.checked);
                this.$set(this.filterList, item.type , activeList);

            }
    }

    private resetCheckbox(item: any) {
        let activeList = {};
        Object.keys(this.filterList).map((itemValue: any) => {
            if (Array.isArray(this.filterList[itemValue])) {
                this.filterList[itemValue].map((items: any) => {
                    items.checked = false;
                });
            } else {
                if ((item.type || item.code) === 'category') {
                    if (this.filterList.subject) {
                        this.filterList.subject.checked = false;
                    }
                    activeList = {};
                } else {
                    activeList = {category: this.filterList.category};
                }
            }
        });
        return activeList;
    }

}

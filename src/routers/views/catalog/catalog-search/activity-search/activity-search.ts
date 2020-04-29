import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
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

    private get enableActivityTabs() {
        return this.isSearchTerms || this.filterList.subject;
    }

    @Prop()
    private filterParams!: any;

    private isShowFilterDropdown: boolean = false;

    @Watch('filterList', { deep: true })
    private onChangeFilterList(value: any) {
        if (value.category) {
            this.$set(this.filterParams, 'flt.subjectClassification', value.category.id);
        }
        if (value.subject) {
            this.$set(this.filterParams, 'flt.subject', value.subject.id);
        }
        if (value.course) {
           this.$set(this.filterParams, 'flt.course', this.arrangeParams(value.course, ',', 'id'));
        }
        if (value.licenses) {
           this.$set(this.filterParams, 'flt.licenseName', this.arrangeParams(value.licenses, '~~'));
        }
        if (value['21-century-skills']) {
            this.$set(this.filterParams, 'flt.21CenturySkills', this.arrangeParams(value['21-century-skills'], '~~'));
        }
        if (value.audience) {
            this.$set(this.filterParams, 'flt.audience', this.arrangeParams(value.audience));
        }
        if (value.dok) {
            this.$set(this.filterParams, 'flt.depthOfKnowledge', this.arrangeParams(value.dok));
        }
    }

    // ----------------------------------------------------------------------------------
    // Actions
    private onSearch() {
        if (this.searchTerms !== '') {
            this.isSearchTerms = true;
            this.$set(this.filterParams, 'q', this.searchTerms);
        }
    }

    private switchSearch() {
        this.$emit('switchSearch');
    }

    private clearSearchBox() {
        this.isSearchTerms = false;
        this.searchTerms = '';
        this.$set(this.filterParams, 'q', '*');
    }

    private onChangeTab(activity: any) {
        const activeTabs = this.activityTabs.find((item: any) => item.isActive);
        this.$set(activeTabs, 'isActive', false);
        if (!activeTabs.isActive) {
            this.$set(activity, 'isActive', true);
        }
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
            this.$set(this.filterList, item.type, activeList);

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
                    activeList = { category: this.filterList.category };
                }
            }
        });
        return activeList;
    }

    /**
     * Help to arrange params
     * @param filterInfo
     * @param delimiter
     * @param keyName
     */
    private arrangeParams(filterInfo: any, delimiter = ',', keyName = 'label') {
        let label = '';
        if (Array.isArray(filterInfo)) {
            filterInfo.map((filterData) => {
                label += delimiter + filterData[`${keyName}`];
            });
            const numOfCharsRemove = delimiter === ',' ? 1 : 2;
            return label.substring(numOfCharsRemove);
        }
        return label;
    }

}

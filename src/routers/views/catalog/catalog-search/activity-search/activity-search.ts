import { Vue, Component, Watch } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import MCIcon from '@/components/icons/mc-icon/mc-icon';
import ActivitySearchFilter from './activity-search-filter/activity-search-filter';
import FilterCard from '@/components/cards/filter-card/filter-card';

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

    private activityTabs: any = [
        {
            name: 'summary',
            tab: 'SummaryActivity',
            key: 'summary',
            isActive: true,
        },
        {
            name: 'courses',
             key: 'course',
            tab: 'CourseActivity',
        },
        {
            name: 'collections',
            key: 'collection',
            tab: 'CollectionActivity',
        },
        {
            name: 'assessments',
            key: 'assessment',
            tab: 'AssessmentActivity',
        },
        {
            name: 'offline Activities',
             key: 'offline-activity',
            tab: 'OfflineActivity',
        },
        {
            name: 'resources',
            key: 'resource',
            tab: 'ResourceActivity',
        },
        {
            name: 'questions',
            key: 'question',
            tab: 'QuestionActivity',
        },
        {
            name: 'rubrics',
            key: 'rubric',
            tab: 'RubricsActivity',
        },
    ];

    private searchTerms: string = '';

    private isSearchTerms: boolean = false;

    private filterList: any = {};

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
            let activeCategory: any = {};
            if (filter.code === 'subject') {
                activeCategory.category = this.filterList.category;
            }
            activeCategory[filter.code]  =  category;
            if (this.filterList.subject) {
                activeCategory = this.resetCheckbox(filter);
            }
            this.$set(this, 'filterList', activeCategory);
        } else {
            this.$set(this.filterList, filter.code, category);
        }
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
                 activeList = item.type === 'category' ? (this.filterList.subject ?
                     this.filterList.subject.checked = false : {}) : {category: this.filterList.category};
            }
        });
        return activeList;
    }

}

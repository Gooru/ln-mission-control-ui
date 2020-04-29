import { Vue, Component, Prop} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { DEFAULT_ACTIVITY_FILTERS, ACTIVITY_FILTER } from '@/utils/constants';
import { resetList } from '@/utils/utils';

@Component({
    name: 'activity-search-filter-accordion',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class ActivitySearchFilterAccordion extends Vue {

    // -----------------------------------------------------------------
    // Properties

    @Prop()
    private filter: any;

    @Prop()
    private filterList?: any;


    private get categoryList() {
        return this.$store.state.activityStore.categoryList;
    }

    private get subjectList() {
        return this.$store.state.activityStore.subjectList;
    }

    private get courseList() {
        return this.$store.state.activityStore.courseList;
    }

    private get centurySkills() {
        return this.$store.state.lookupStore.centurySkills;
    }

    private get dok() {
        return this.$store.state.lookupStore.dok;
    }

    private get audience() {
        return this.$store.state.lookupStore.audience;
    }

    private get license() {
        return this.$store.state.lookupStore.license;
    }
    // -------------------------------------------------------------------------
    // Hooks

    // -------------------------------------------------------------------------
    // Actions
    private onDropdown(filter: any) {
        resetList(DEFAULT_ACTIVITY_FILTERS, filter, ['isActive', 'code']);
        resetList(ACTIVITY_FILTER, filter, ['isActive', 'code']);
        const isActive = filter.isActive ? false : true;
        this.$set(filter, 'isActive', isActive);
    }
    // --------------------------------------------------------------------------
    // Methods

    private onSelectCategory(category: any) {
        this.$store.dispatch('activityStore/fetchSubject', category.id);
        this.resetList(this.categoryList, category);
        const isActive = category.checked ? false : true;
        this.$set(category, 'checked', isActive);
        this.$emit('onSelectCategory', isActive ? category  : {}, this.filter);
    }

    private onSelectSubject(subject: any) {
        this.$store.dispatch('activityStore/fetchCourse', subject);
        this.$store.dispatch('lookupStore/fetchActivityDetails');
        this.resetList(this.subjectList, subject);
        const isActive = subject.checked ? false : true;
        this.$set(subject, 'checked', isActive);
        this.$emit('onSelectCategory', isActive ? subject : {}, this.filter);
    }

    private onSelectCourse(course: any) {
        const isActive = course.checked ? false : true;
        this.$set(course, 'checked', isActive);
        const selectedCourse = this.courseList.filter((item: any) => item.checked);
        this.$emit('onSelectCategory', selectedCourse, this.filter);
    }

    private onOtherAcivityFilter(content: any, items: any) {
        const isActive = items.checked ? false : true;
        this.$set(items, 'checked', isActive);
        const selectedItems = content.filter((item: any) => item.checked);
        this.$emit('onSelectCategory', selectedItems, this.filter);
    }

    private resetList(list: any, currentItem: any) {
        this.filter.isActive = !this.filter.isActive;
        resetList(list, currentItem);
    }


}
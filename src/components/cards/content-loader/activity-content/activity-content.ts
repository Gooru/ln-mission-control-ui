import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import CourseCard from '../../course-card/course-card';
import CollectionCard from '../../collection-card/collection-card';
import AssessmentCard from '../../assessment-card/assessment-card';

@Component({
    name: 'activity-content',
    components: {
        'material-icon': GoogleMaterialIcon,
        'course': CourseCard,
        'collection': CollectionCard,
        'assessment': AssessmentCard,
    },
})

export default class ActivityContent extends Vue {

    @Prop()
    private activeComponent: any;

    @Prop()
    private filterParams: any;

    private start: number = 0;

    private length: number = 10;

    private isLoaded: boolean = false;

    @Watch('filterParams', {deep: true})
    private onChangeParams() {
      this.onLoadData();
    }

    @Watch('activeComponent', {deep: true})
    private onChangeActiveComponent(value: any) {
      this.onLoadData();
    }

    private get params() {
        const params: any = {
            start: this.start,
            length: this.length,
        };
        if (this.activeComponent.key === 'collection' || this.activeComponent.key === 'assessment') {
            params['flt.collectionType'] = this.activeComponent.key;
        }
        return Object.assign(params, this.filterParams);
    }

    private get contents() {
        return this.$store.state.activityStore[`${this.activeComponent.key}Catalog`].searchResults || [];
    }

    private created() {
        this.onLoadData();
    }

    private onLoadData() {
        this.$store.dispatch(`activityStore/${this.activeComponent.apiKey}CatalogSearch`, this.params);
    }


    private contentBind(content: any) {
        const contentBind: any = {};
        contentBind[this.activeComponent.key] = content;
        return contentBind;
    }
}

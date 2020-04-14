import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import CourseCard from '../../course-card/course-card';

@Component({
    name: 'activity-content',
    components: {
        'material-icon': GoogleMaterialIcon,
        'course': CourseCard,
    },
})

export default class ActivityContent extends Vue {

    @Prop()
    private activeComponent: any;

    @Prop()
    private filterParams: any;

    private start: number = 0;

    private length: number = 10;

    @Watch('filterParams', {deep: true})
    private onChangeParams() {
      this.onLoadData();
    }

    @Watch('activeComponent', {deep: true})
    private onChangeActiveComponent(value: any) {
      this.onLoadData();
    }

    private get params() {
        return Object.assign({
            start: this.start,
            length: this.length,
        }, this.filterParams);
    }

    private get courseContent() {
        return this.$store.state.activityStore[`${this.activeComponent.apiKey}Catalog`];
    }

    private created() {
        this.onLoadData();
    }

    private onLoadData() {
        this.$store.dispatch(`activityStore/${this.activeComponent.apiKey}CatalogDetails`, this.params);
    }
}

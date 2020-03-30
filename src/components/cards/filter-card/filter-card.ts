import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
    name: 'filter-card',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class FilterCard extends Vue {

    // ---------------------------------------------------------------------------
    // Properties

    private defaultVisibleTags: number = 3;

    // private get nonVisibleCount() {
    //     return this.nonVisibleFilterList.length;
    // }

    @Prop()
    private filterList: any;

  private visibleFilterList: any = [];

  private nonVisibleFilterList: any = [];


    private isShowNonVisibleTab: boolean = false;

    @Watch('filterList', {deep: true})
        private onChangeList(value: any) {
            const visibleList: any = [];
            Object.keys(value).map((item) => {
                if (item === 'category' || item === 'subject') {
                    visibleList.push(value[item]);
                }
            });
            this.visibleFilterList = visibleList;
        }

}

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

    @Prop()
    private filterList: any;

    private visibleFilterList: any = [];

    private nonVisibleFilterList: any = [];

    private get nonVisibleCount() {
        return this.nonVisibleFilterList.length;
    }


    private isShowNonVisibleTab: boolean = false;

    @Watch('filterList', {deep: true})
        private onChangeList(value: any) {
            const visibleList: any = [];
            const nonVisibleList: any = [];
            Object.keys(value).map((item) => {
                if (item === 'category' || item === 'subject') {
                    value[item].type = item;
                    visibleList.push(value[item]);
                } else {
                    (value[item]).forEach((itemValue: any, index: number) => {
                        itemValue.type = item;
                        if (visibleList.length < 3) {
                            visibleList.push(itemValue);
                        } else {
                            nonVisibleList.push(itemValue);
                        }
                    });
                }
            });
            this.visibleFilterList = visibleList;
            this.nonVisibleFilterList = nonVisibleList;
        }


        // -------------------------------------------------------------------------
        // Actions
        private onClearItem(item: any) {
            this.$emit('onClearItem', item);
        }

}

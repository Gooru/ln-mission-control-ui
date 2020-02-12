import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'taxonomy-card',
    components: {

    },
})

export default class TaxonomyCard extends Vue {

    // ---------------------------------------------------------------------
    // Properties

    @Prop()
    private taxonomyList: any;

    @Prop()
    private visibleTags?: number;

    private isShowNonVisibleTag: boolean = false;

    private get fixedLength() {
        return this.visibleTags ? this.visibleTags : 1;
    }

    private get isShowMore() {
        return (this.fixedLength < this.taxonomyList.length) ? true : false;
    }
    private get visibleList() {
        return (this.taxonomyList.length > this.fixedLength) ?
            this.taxonomyList.slice(0, this.fixedLength) : this.taxonomyList;
    }

    private get nonVisibleList() {
        return this.taxonomyList.filter((item: any, index: number) => index >= this.fixedLength);
    }

}

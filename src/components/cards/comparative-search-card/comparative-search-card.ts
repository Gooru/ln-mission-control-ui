import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'comparative-search-card',
})

export default class ComparativeSearchCard extends Vue {

    // ------------------------------------------------------------------------
    // Properties
    @Prop()
    private cardName?: string;

    @Prop()
    private content: any;
}

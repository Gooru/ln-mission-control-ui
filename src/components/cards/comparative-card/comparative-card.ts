import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'comparative-card',
})

export default class ComparativeCard extends Vue {

    // ------------------------------------------------------------------------
    // Properties
    @Prop()
    private searchItem: any;
}

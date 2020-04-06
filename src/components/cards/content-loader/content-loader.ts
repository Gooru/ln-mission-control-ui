import {Vue, Component, Prop} from 'vue-property-decorator';

@Component({
    name: 'content-loader',
    components: {

    },
})

export default class ContentLoder extends Vue {

    // ----------------------------------------------
    // Properties

    @Prop()
    public contentType: any;

    private get contentList() {
        return;
    }

}

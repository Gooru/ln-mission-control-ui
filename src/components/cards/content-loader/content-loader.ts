import {Vue, Component, Prop} from 'vue-property-decorator';
import { CATALOG_MENUS } from '@/utils/constants';
import SummaryContent from './summary-content/summary-content';
import ActivityContent from './activity-content/activity-content';

@Component({
    name: 'content-loader',
    components: {
        SummaryContent,
        ActivityContent,
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

    private get activeComponent() {
        return CATALOG_MENUS.find((item: any) => item.isActive);
    }

}

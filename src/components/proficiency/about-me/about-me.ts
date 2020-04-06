import {Vue, Component, Prop} from 'vue-property-decorator';
import moment from 'moment';

@Component({
    name: 'about-me',
})

export default class AboutMe extends Vue {


    @Prop()
    public learner: any;


    private lastUpdate() {
        return moment.utc(this.learner.updateAt).format('LL');
    }

}

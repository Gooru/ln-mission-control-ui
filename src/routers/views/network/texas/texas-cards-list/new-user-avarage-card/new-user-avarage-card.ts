import {Component, Vue} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
    name: 'new-user-avarage-card',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class NewUserAvarageCard extends Vue {

}

import { Vue, Component } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { DEFAULT_ROLES } from '@/utils/constants';

@Component({
    name: 'role-list',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class RoleList extends Vue {

    // -------------------------------------------------------------------------
    // Properties

    private roleList: any = DEFAULT_ROLES;

}

import { Component , Vue  } from 'vue-property-decorator';
@Component({
    name: 'content-usage-map-popup',
    components: {
    },
})

export default class ContentUsageMapPopup extends Vue {


    private details: any = [
        {
           type: 'Countries',
           total: 3034,
        },
        {
            type: 'States',
            total: 334,
         },
         {
            type: 'Teachers',
            total: 34,
         },
         {
            type: 'Students',
            total: 434,
         },
    ];
}

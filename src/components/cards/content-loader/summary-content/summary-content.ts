import {Vue, Component, Prop} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
    name: 'summary-content',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class SummaryContent extends Vue {

    @Prop()
    private activeComponent: any;

    private content: any = [
        {
          name: 'Audio',
          value:  0,
          colorCode: '#76C8BC',
        },
        {
          name: 'Videos',
          value:   0,
          colorCode: '#3EB6A6',
        },
        {
          name: 'Interactive',
          value:   0,
          colorCode: '#76C8BC',
        },
        {
          name: 'Images',
          value: 0,
          colorCode: '#76C8BC',
        },
        {
          name: 'Webpages',
          value:   0,
          colorCode: '#009A87',
        },
        {
          name: 'Text',
          value:   0,
          colorCode: '#76C8BC',
        },
      ];
      private question: any = [
        {
          name: 'Multiple Choice',
          value:   0,
          colorCode: '#3A434D',
        },
        {
          name: 'Multiple Answer',
          value:  0,
          colorCode: '#6E767D',
        },
        {
          name: 'True Or False',
          value:  0,
          colorCode: '#93999E',
        },
        {
          name: 'Fill In The Blank',
          value:   0,
          colorCode: '#3A434D',
        },
        {
          name: 'Multiple Select - Image',
          value:  0,
          colorCode: '#3A434D',
        },
        {
          name: 'Multiple Select - Text',
          value:   0,
          colorCode: '#93999E',
        },
        {
          name: 'Highlight Text',
          value:   0,
          colorCode: '#93999E',
        },
        {
          name: 'Drag And Drop Order',
          value:  0,
          colorCode: '#3A434D',
        },
        {
          name: 'Open Ended',
          value:   0,
          colorCode: '#3A434D',
        },
      ];

}

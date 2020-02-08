import { Component, Vue, Prop } from 'vue-property-decorator';
import GeoGroupPicker from './geo-group-picker/geo-group-picker';

@Component({
  name: 'learner-filter',
  components: {
    'geo-group-picker': GeoGroupPicker,
  },
})

export default class LearnerFilter extends Vue {

}

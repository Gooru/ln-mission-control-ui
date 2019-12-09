import { Component, Vue, Prop } from 'vue-property-decorator';
import {getDateRangeArray} from '@/utils/date';
import { getFormattedYear, getFormattedMonth } from '@/helpers/date-format';
import moment from 'moment';

@Component({
  name: 'month-year-picker',
})
export default class MonthYearPicker extends Vue {

  private startDate = moment();

  private endDate = moment();

  private dateRangeList: any = [];

  private activeDate: string = moment().format('YYYY-MM-01');

  @Prop()
  private activeYear!: string;

  private created() {
    this.loadDateRange();
  }

  private onSelectMonthYear(date: string) {
    this.activeDate = date;
    this.$emit('onChageTimeline', date);
  }

  private loadDateRange() {
    const startDate = '01-01-2019';
    const endDate = '12-01-2019';
    const dateRangeList = getDateRangeArray(startDate, endDate, 'month');
    this.dateRangeList = dateRangeList;
  }

  private formatMonth(date: string) {
    return getFormattedMonth(date);
  }

  private formatYear(date: string) {
    return getFormattedYear(date);
  }
}

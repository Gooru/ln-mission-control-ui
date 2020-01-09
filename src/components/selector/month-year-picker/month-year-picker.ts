import { Component, Vue, Prop } from 'vue-property-decorator';
import {getDateRangeArray, subtractMonth, addMonth} from '@/utils/date';
import { getFormattedYear, getFormattedMonth } from '@/helpers/date-format';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import moment from 'moment';

@Component({
  name: 'month-year-picker',
  components: {
    'google-material-icon': GoogleMaterialIcon,
  },
})
export default class MonthYearPicker extends Vue {

  private startDate: string = moment().subtract(11, 'month').format('YYYY-MM-01');

  private endDate: string = moment().format('YYYY-MM-01');

  private dateRangeList: any = [];

  private activeDate: string = moment().format('YYYY-MM-01');

  private currentMonth: string = moment().format('YYYY-MM-01');

  private carouselMonths: number = 2;

  private activeYear!: string;

  @Prop()
  private startYear!: string;

  private currentYear: string = moment().format('YYYY');

  private yearList: any = [];

  private isShowYearDropdown: boolean = false;

  private created() {
    this.loadDateRange();
    this.loadYearRange();
  }

  private onSelectMonthYear(date: string) {
    this.activeDate = date;
    this.$emit('onChageTimeline', date);
  }

  private onSelectYear(year: any = moment()) {
    year = moment(year).format('YYYY');
    this.startDate = moment().format(`${year}-MM-01`);
    this.endDate = addMonth(this.startDate, 11);
    this.activeYear = year;
    this.loadDateRange();
    this.isShowYearDropdown = !this.isShowYearDropdown;
  }

  private onPopulateMonth(direction: string) {
    const component = this;
    let startDate = component.startDate;
    let endDate = component.endDate;
    if (direction === 'left') {
      startDate = subtractMonth(startDate, this.carouselMonths);
      endDate = subtractMonth(endDate, this.carouselMonths);
    } else {
      startDate = addMonth(startDate, this.carouselMonths);
      endDate = addMonth(endDate, this.carouselMonths);
    }
    component.startDate = startDate;
    component.endDate = endDate;
    this.loadDateRange();
  }

  private loadDateRange() {
    const startDate = this.startDate;
    const endDate = this.endDate;
    const dateRangeList = getDateRangeArray(startDate, endDate, 'month');
    this.dateRangeList = dateRangeList;
  }

  private loadYearRange() {
    let startYear = this.startYear || (parseInt(this.currentYear, 10) - 2).toString();
    startYear = moment(startYear).format('YYYY');
    const currentYear = moment(this.currentYear).format('YYYY');
    const yearList = getDateRangeArray(startYear, currentYear, 'year');
    this.yearList = yearList;
  }

  private formatMonth(date: string) {
    return getFormattedMonth(date);
  }

  private formatYear(date: string) {
    return getFormattedYear(date);
  }
}

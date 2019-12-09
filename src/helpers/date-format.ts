import moment from 'moment';

export function getFormattedYear(date: any = moment(), format: string = 'YYYY') {
  return moment(date).format(format);
}

export function getFormattedMonth(date: any = moment(), format: string = 'MMM') {
  return moment(date).format(format);
}

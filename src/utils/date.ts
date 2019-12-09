import moment from 'moment';

export function getDateRangeArray(dateStart?: any, dateEnd?: any, iterateBy: string = 'date') {
  dateStart = dateStart ? moment(dateStart) : moment();
  dateEnd = dateEnd ? moment(dateEnd) : moment();
  const dateValues = [];
  while (dateEnd >= dateStart) {
     dateValues.push(dateStart.format('YYYY-MM-DD'));
     dateStart.add(1, iterateBy);
  }
  return dateValues;
}

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

export function formatTime(timeInMillis: number) {
  let result = '';
  let secs;

  if (timeInMillis) {
    secs = timeInMillis / 1000;
    const hours = secs / 3600;
    secs = secs % 3600;
    const mins = secs / 60;
    secs = secs % 60;

    if (hours >= 1) {
      result = `${Math.floor(hours)}h `;
      if (mins >= 1) {
        result += `${Math.floor(mins)}m`;
      }
    } else {
      if (mins >= 1) {
        result = `${Math.floor(mins)}m `;
      }
      if (secs >= 1) {
        result += `${Math.floor(secs)}s`;
      }
    }
  } else {
    result = '';
  }

  return result;
}

export function subtractMonth(curDate: any = moment(), numberOfMonth: number = 1) {
  return moment(curDate).subtract(numberOfMonth, 'month').format('YYYY-MM-DD');
}

export function addMonth(curDate: any = moment(), numberOfMonth: number = 1) {
  return moment(curDate).add(numberOfMonth, 'month').format('YYYY-MM-DD');
}

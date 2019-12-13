/**
 * Find the route path last occurrence
 * @return {String}
 */
export function getRoutePathLastOccurrence() {
  const currentLocationPath = window.location.pathname;
  return currentLocationPath.substr(currentLocationPath.lastIndexOf('/') + 1);
}

/**
 * Find the route path first occurrence
 * @return {String}
 */
export function getRoutePathFirstOccurrence() {
  const currentLocationPath = window.location.pathname;
  return currentLocationPath.split('/')[2];
}

/**
 * This Method is responsible for sorting the array object by asc or desc.
 * @param  {Array}
 * @param  {PropertyName}
 * @param  {string} 'ASC|DESC'
 */
export function sortByProperty<T>(array: T[], propName: keyof T, order: 'ASC' | 'DESC'): void {
    array.sort((a, b) => {
        if (a[propName] < b[propName]) {
            return -1;
        }

        if (a[propName] > b[propName]) {
            return 1;
        }
        return 0;
    });

    if (order === 'DESC') {
        array.reverse();
    }
}

export function getSum(dataList: any) {
     return dataList.reduce(
        (count: any, data: any) => count + data.completed_competencies, 0);
}

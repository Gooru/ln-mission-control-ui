import {GRADING_SCALE} from '@/utils/constants';
import { isNumeric } from '@/utils/math';
import { appConfigService } from '@/providers/services/app/app-config';

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

/**
 * This Method is identifying color code based on the performance
 * @param  {Number}
 */
export function getGradeRange(score: number): string {
  let scaleSize = GRADING_SCALE.length - 1;
  let range = 'not-started'; // Default color

  if (isNumeric(score)) {
    for (; scaleSize >= 0; scaleSize--) {
      if (score >= GRADING_SCALE[scaleSize].LOWER_LIMIT) {
        range = GRADING_SCALE[scaleSize].RANGE;
        break;
      }
    }
  }
  return range;
}

export function getSum(dataList: any, property: any) {
     return dataList.reduce(
        (count: any, data: any) => count + data[property], 0);
}

export function getDomainId(id: any) {
  const ids = id.split('-');
  return `${ids[0]}-${ids[1]}-${ids[2]}`;
}
export function getCourseId(id: any) {
  const ids = id.split('-');
  return `${ids[0]}-${ids[1]}`;
}

export function getSubjectId(id: any) {
  return id.substring(0, id.indexOf('-'));
}

export function isMicroStandardId(id: any) {
    return /.*\d{2}-\d{2}/.test(id) || /.*\.\d{2}\.\d{2}\./.test(id);
  }

export function getTaxonomyTags(
    taxonomy = [],
    editable = false,
    removable = false,
    canAdd = false,
  ) {
    return taxonomy.map((tagData) => {
      return  {
        isActive: false,
        isReadonly: !editable,
        isRemovable: removable,
        canAdd,
        data: tagData,
      };
    });
  }

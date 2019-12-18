import { COMPETENCY_STATUS } from '@/utils/constants';

export function competencyStatus(status: number) {
  return status >= 0 ? COMPETENCY_STATUS[status] : '';
}

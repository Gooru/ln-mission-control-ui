import { http } from '@/providers/apis/http';
import {
  GroupsReportRequest,
  GroupsCompetencyReportRequest,
  GroupsPerformanceRequest} from '@/models/groups/request-param';
import { groupsSerializer } from '@/providers/serializers/groups/groups';

export class GroupsAPI {
  public static INSTANCE = new GroupsAPI();

  private namespace: string = 'api/reports/v1/groups';

  public fetchUserHierarchies() {
    const endpoint = `${this.namespace}/hierarchies/user`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers).then((response) => {
      console.log('response', response.data);
      return groupsSerializer.serializeUserHierarchies(response.data);
    });
  }

  public fetchGroupReport(params: GroupsReportRequest) {
    const endpoint = `${this.namespace}`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers, params).then((response) => {
      console.log('response', response.data);
      return response.data;
    });
  }

  public fetchGroupsCompetencyReport(params: GroupsCompetencyReportRequest) {
    const endpoint = `${this.namespace}/competency`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers, params).then((response) => {
      console.log('response', response.data);
      return response.data;
    });
  }

  public fetchGroupsPerformance(params: GroupsPerformanceRequest) {
    const endpoint = `${this.namespace}/performance`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers, params).then((response) => {
      console.log('response', response.data);
      return response.data;
    });
  }

}

export const groupsApi = GroupsAPI.INSTANCE;


export interface GroupsReportRequest {
  hierarchyId: number;
  tenants?: string;
  month?: number;
  year?: number;
  frequency?: string;
}

export interface GroupsCompetencyReportRequest {
  hierarchyId: number;
  tenants?: string;
  groupId: string;
  groupType: string;
  month?: number;
  year?: number;
  frequency?: string;
}

export interface GroupsPerformanceRequest {
  groupId: number;
  groupType: string;
  month?: number;
  year?: number;
  frequency?: string;
}

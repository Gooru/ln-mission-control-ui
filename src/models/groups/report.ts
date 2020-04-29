export interface ReportContext {
  report: string;
  hierarchy: number;
  tenants?: string[];
  groupId?: number;
  groupType: string;
  month: number;
  year: number;
  frequency: string;
}

interface ReportOverallStats {
  totalCompletedCompetencies: number;
  totalInferredCompetencies: number;
  totalInprogressCompetencies: number;
  totalNotstartedCompetencies: number;
}

interface ReportDataCoordinate {
  coordinate?: number;
  label: string;
  completedCompetencies: number;
  inferredCompetencies: number;
  inprogressCompetencies: number;
  notstartedCompetencies: number;
}

interface ReportDataDrilldown {
  id: number;
  name: string;
  code: string;
  type: string;
  completedCompetencies: number;
  inferredCompetencies: number;
  inprogressCompetencies: number;
  notstartedCompetencies: number;
}
interface ReportData {
  id: number;
  name: string;
  code: string;
  type: string;
  coordinates: ReportDataCoordinate[];
  drilldown: ReportDataDrilldown[];
}

export interface GroupsReport {
  context: ReportContext;
  overallStats: ReportOverallStats;
  data: ReportData;
}

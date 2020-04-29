interface PerformanceContext {
  report: string;
  groupId: number;
  group_type: string;
  month: number;
  year: number;
  frequency: string;
}

interface PerformanceOverallStats {
  averagePerformance: number;
  totalTimespent: number;
}

interface PerformanceData {
  week: number;
  performance: number;
  timespent: number;
}

interface PerformanceDrilldown {
  id: number;
  name: string;
  code: string;
  type: string;
  performance: number;
  timespent: number;
}

export interface GroupsPerformance {
  context: PerformanceContext;
  overallStats: PerformanceOverallStats;
  data: PerformanceData[];
  drilldown: PerformanceDrilldown[];
}

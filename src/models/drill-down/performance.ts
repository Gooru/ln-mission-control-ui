import { OverallStatsModel } from './overall-stats';
import { DrillDownModel } from './drill-down';

export interface PerformanceModel {
    overallStats?: OverallStatsModel;
    data?: DrillDownModel[];
}

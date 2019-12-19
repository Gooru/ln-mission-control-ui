import { OverallStatsModel } from './overall-stats';
import { DrillDownModel } from './drill-down';
import { CompetencyChart } from './competency-chart';

export interface CompetencyModel {
    overallStats: OverallStatsModel;
    data: CompetencyChart[];
    drilldown: DrillDownModel[];
}

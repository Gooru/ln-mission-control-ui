import { StateModel } from './state';
import { OverallModel } from './overall';

export interface PerformanceModel {
    overallStats: OverallModel;
    data: StateModel[];
}

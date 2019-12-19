export interface DrillDownModel {
    id: number;
    name: string;
    code?: string;
    type: string;
    subType?: string;
    timespent?: number;
    performance?: number;
    completedCompetencies?: number;
    inprogressCompetencies?: number;
    courseId?: string;
}

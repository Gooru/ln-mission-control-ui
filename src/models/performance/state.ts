export interface StateModel {
    id: number;
    name: string;
    code: string;
    type: string;
    sub_type?: string;
    timespent: number;
    performance: number;
    completed_competencies: number;
    inprogress_competencies: number;
}

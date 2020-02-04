import { CompetencyModel } from '@/models/drill-down/competency';
import { PerformanceModel } from '@/models/drill-down/performance';
import { PvcModel } from '@/models/drill-down/pvc';
import { SubjectModel } from '@/models/drill-down/subject';
import { CompetencyChart } from '@/models/drill-down/competency-chart';
import { OverallStatsModel } from '@/models/drill-down/overall-stats';
import { DrillDownModel } from '@/models/drill-down/drill-down';
import { CountryModel } from '@/models/drill-down/country';


export class DrillDownSerializer {

    private static INSTANCE = new DrillDownSerializer();

    static get instance() {
        return this.INSTANCE;
    }

    public serializeCompetency(res: any): CompetencyModel {
        const result: CompetencyModel = {
            overallStats: this.serializeOverallStats(res),
            data: this.serializeCompetencyData(res.data),
            drilldown: this.serializeDrillDown(res),
        };
        return result;
    }

    public serializePerformance(res: any): PerformanceModel {
        const result: PerformanceModel = {
            overallStats: this.serializeOverallStats(res),
            data: this.serializeDrillDown(res),
        };
        return result;
    }

    public serializeClassRooms(res: any): PvcModel[] {
        const students: PvcModel[] = new Array();
        const classRoomList = res.competencyStats ? res.competencyStats : [];
        if (classRoomList.length) {
            classRoomList.map((list: any) => {
                const student: PvcModel = {
                    completedCompetencies: Math.round(list.completedCompetencies),
                    grade: list.grade,
                    gradeId: list.gradeId,
                    inprogressCompetencies: Math.abs(list.inprogressCompetencies),
                    percentCompletion: list.percentCompletion,
                    percentScore: list.percentScore,
                    totalCompetencies: Math.abs(list.totalCompetencies),
                    userId: list.userId,
                };
                students.push(student);
            });
        }
        return students;
    }

    public serializeSubject(subjects: any): SubjectModel[] {
        const result: SubjectModel[] = new Array();
        const subjectsList = subjects.subjects ? subjects.subjects : [];
        if (subjectsList.length) {
            subjectsList.map((list: any) => {
                const subject: SubjectModel = {
                    framework: list.framework,
                    name: list.name,
                    subject: list.subject,
                };
                result.push(subject);
            });
        }
        return result;
    }

    public serializeCompetencyData(res: any): CompetencyChart[] {
        const result: CompetencyChart[] = new Array();
        if (res.length) {
            res.map((data: any) => {
                const chartData: CompetencyChart = {
                    week: data.week,
                    completedCompetencies: Math.abs(data.completedCompetencies),
                };
                result.push(chartData);
            });
        }
        return result;
    }

    public serializeOverallStats(res: any): OverallStatsModel {
        const result: OverallStatsModel = {
            averagePerformance: Math.round(res.overallStats.averagePerformance),
            totalCompetencies: Math.abs(res.overallStats.totalCompetencies),
        };
        return result;
    }


    public serializeDrillDown(res: any): DrillDownModel[] {
        const result: DrillDownModel[] = new Array();
        const drilldown = res.drilldown || res.data;
        if (drilldown.length) {
            drilldown.map((data: any) => {
                const levelData: DrillDownModel = {
                    id: data.id,
                    name: data.name,
                    type: data.type,
                    code: data.code,
                    subType: data.subType,
                    timespent: data.timespent,
                    performance: Math.round(data.performance),
                    completedCompetencies: Math.abs(data.completedCompetencies),
                    inprogressCompetencies: Math.abs(data.inprogressCompetencies),
                    courseId: data.classId,
                };
                result.push(levelData);
            });
        }
        return result;
    }

    public serializeCountry(payload: any): CountryModel[] {
        const countries = payload ? payload.countries : [];
        const countriesList: CountryModel[] = [];
        if (countries) {
            countries.map((country: any) => {
                countriesList.push({
                    id: country.id,
                    name: country.name,
                    code: country.code,
                    completedCompetencies: country.completedCompetencies,
                });
            });
        }
        return countriesList;

    }





}

export const drillDownSerializer = DrillDownSerializer.instance;

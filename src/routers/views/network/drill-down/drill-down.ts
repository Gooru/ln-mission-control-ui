import { Component, Vue } from 'vue-property-decorator';
import LevelCard from './level-card/level-card';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import LevelChart from './level-chart/level-chart';
import CardsList from './cards-list/cards-list';
import PerformanceByGrade from './performance-by-grade/performance-by-grade';
import axios from 'axios';
import MonthYearPicker from '@/components/selector/month-year-picker/month-year-picker';
import moment from 'moment';
import { profileAPI } from '@/providers/apis/profile/profile';
import { CompetencyModel } from '@/models/drill-down/competency';
import { DrillDownModel } from '@/models/drill-down/drill-down';
import { SubjectModel } from '@/models/drill-down/subject';
import { drillDownAPI } from '@/providers/apis/drill-down/drill-down';


@Component({
    name: 'country-drill-down',
    components: {
        'level-chart': LevelChart,
        'level-card': LevelCard,
        'material-icon': GoogleMaterialIcon,
        'card-list': CardsList,
        'texas-grade-list': PerformanceByGrade,
        'month-picker': MonthYearPicker,
    },
})

export default class DrillDown extends Vue {

    // -------------------------------------------------------------
    // Properties
    private competencyData?: CompetencyModel;

    private studentList: any = [];

    private countryId?: string;

    private countryData?: any;

    private paramsIds: any = {};

    private breadcrumb: any = [];

    private isLoaded: boolean = false;

    private seletedLevel?: DrillDownModel;

    private selectedDate: string = '';

    private subjectsList?: SubjectModel[] = [];

    private dataParams: any = {
        month: moment().format('MM'),
        year: moment().format('YYYY'),
        frequency: 'monthly',
    };

    private hideProperty: boolean = false;

    private cardDetails: any = {};

    // --------------------------------------------------------------
    // Hooks

    private created() {
        this.countryId = this.$route.params.id;
        this.countryData = {
            id: this.countryId,
            name: this.$route.params.name,
            type: 'country',
        };
        this.seletedLevel = this.countryData;
        this.getStateList();
    }

    // ---------------------------------------------------------------
    // Actions
    private onSelectLevel(selectedLevel: any) {
        this.selectedLevelData(selectedLevel);
    }

    private backButton() {
        this.$router.push('/network');
    }

    private onBack() {
         this.breadcrumb.pop();
         if (this.breadcrumb.length > 1) {
            this.seletedLevel = this.breadcrumb[this.breadcrumb.length - 1];
         } else {
            this.seletedLevel = this.countryData;
            this.breadcrumb = [];
         }
         this.fetchSelectLevelData(this.seletedLevel);
    }

    private onChageTimeline(date: any) {
        this.selectedDate = date;
        this.dataParams.month = moment(date).format('MM');
        this.dataParams.year = moment(date).format('YYYY');
        this.getSubjectDetails(this.paramsIds);
        this.fetchSelectLevelData(this.seletedLevel);
    }

    // --------------------------------------------------------------
    // Methods
    private getStateList() {
        const params: any = this.paramsIds;
        params.country_id = this.countryId;
        this.getSubjectDetails(params);
        axios.all([
            drillDownAPI.fetchStateCompetencyByCountryID(params, this.dataParams),
            drillDownAPI.fetchCardsDatabyCountryLevel(params),
        ]).then(axios.spread((competency, cardData) => {
            this.competencyData = competency;
            this.cardDetails = this.getDataBasedOnLevel(cardData);
            this.isLoaded = true;
        }));

    }

    private selectLevelService(selectedLevel: any) {
        let serviceLevel: any = Promise.resolve([]);
        switch (selectedLevel.type) {
            case 'country':
                this.paramsIds.country_id = selectedLevel.id;
                serviceLevel = axios.all([
                    drillDownAPI.fetchStateCompetencyByCountryID(this.paramsIds, this.dataParams),
                    drillDownAPI.fetchCardsDatabyCountryLevel(this.paramsIds),
                ]);
                break;
            case 'state':
                this.paramsIds.state_id = selectedLevel.id;
                serviceLevel = axios.all([
                    drillDownAPI.fetchDistrictCompetencyByStateID(this.paramsIds, this.dataParams),
                    drillDownAPI.fetchCardsDatabyStateLevel(this.paramsIds),
                ]);
                break;
            case 'system':
                this.paramsIds.group_id = selectedLevel.id;
                serviceLevel = axios.all([
                    drillDownAPI.fetchSchoolCompetencyByDistrictID(this.paramsIds, this.dataParams),
                    drillDownAPI.fetchCardsDatabyDistrictLevel(this.paramsIds),
                ]);
                break;
            case 'school':
                this.paramsIds.school_id = selectedLevel.id;
                serviceLevel = axios.all([
                    drillDownAPI.fetchClassCompetencyBySchoolID(this.paramsIds, this.dataParams),
                    drillDownAPI.fetchCardsDatabySchoolLevel(this.paramsIds),
                ]);
                break;
            default:
                const params = {
                    classId: selectedLevel.id,
                    courseId: selectedLevel.courseId,
                    subjectCode: 'K12.MA',
                    month: this.dataParams.month,
                    year: this.dataParams.year,
                };
                this.fetchClassRoomStudentList(params);
                break;

        }
        return serviceLevel;
    }

    private fetchSelectLevelData(selectedLevel: any) {
        const selectedService = this.selectLevelService(selectedLevel);
        return selectedService.then(axios.spread((levelData: any, cardData: any) => {
            this.competencyData = levelData;
            this.cardDetails = this.getDataBasedOnLevel(cardData);
        }));
    }

    private selectedLevelData(selectedLevel: any) {
        const isBreadcrumb = this.breadcrumb.indexOf(selectedLevel);
        if (isBreadcrumb !== -1) {
            this.breadcrumb = this.breadcrumb.slice(0, isBreadcrumb);
            if (this.breadcrumb.length !== 0) {
                this.breadcrumb.push(selectedLevel);
            }
        } else {
            if (this.breadcrumb.length === 0) {
                this.breadcrumb.push(this.countryData);
            }
            this.breadcrumb.push(selectedLevel);
        }
        this.seletedLevel = selectedLevel;
        this.fetchSelectLevelData(selectedLevel);
    }

    private fetchClassRoomStudentList(params: any) {

        drillDownAPI.fetchStudentsByClassID(params).then((atcClassStudents) => {
            const studentsId: any = [];
            atcClassStudents.map((students: any) => {
                return studentsId.push(students.userId);
            });
            const filteredData: any = [];
            if (studentsId.length) {
                profileAPI.fetchUserProfiles(studentsId.toString()).then((profileList) => {
                    profileList.map((profile) => {
                        const findProfile = atcClassStudents.find((item: any) => item.userId === profile.userId);
                        if (findProfile) {
                            filteredData.push(Object.assign({}, findProfile, profile));
                        }
                    });
                });
            }
            this.studentList = filteredData;
        });
    }

    private getDataBasedOnLevel(userData: any) {
        const month = this.dataParams.month;
        const year = this.dataParams.year;
        return (userData &&
             Object.keys(userData).length &&
             userData[`${month}_${year}`])
             ? userData[`${month}_${year}`] : {};
    }

    private getSubjectDetails(params: any) {
        drillDownAPI.fetchCountrySubject(params, this.dataParams).then((subjects) => {
            this.subjectsList = subjects;
        });
    }

}

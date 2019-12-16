import { Component, Vue } from 'vue-property-decorator';
import TexasDistrictCard from './texas-district-card/texas-district-card';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import TexasChart from './texas-chart/texas-chart';
import TexasCardsList from './texas-cards-list/texas-cards-list';
import PerformanceByGrade from './performance-by-grade/performance-by-grade';
import { perfomanceAPI } from '@/providers/apis/performance/performance';
import axios from 'axios';
import MonthYearPicker from '@/components/selector/month-year-picker/month-year-picker';
import moment from 'moment';
import { profileAPI } from '@/providers/apis/profile/profile';

@Component({
    name: 'country-drill-down',
    components: {
        'texas-chart': TexasChart,
        'texas-district-card': TexasDistrictCard,
        'material-icon': GoogleMaterialIcon,
        'texas-card-list': TexasCardsList,
        'texas-grade-list': PerformanceByGrade,
        'month-picker': MonthYearPicker,
    },
})

export default class CountryDrillDown extends Vue {

    // -------------------------------------------------------------
    // Properties

    private stateList: any = [];

    private competencyData: any = [];

    private countryId?: string;

    private countryData?: any;

    private paramsIds: any = {};

    private breadcrumb: any = [];

    private isLoaded: boolean = false;

    private seletedLevel: any;

    private selectedDate: string = '';

    private subjectsList?: any;

    private dataParams: any = {
        month: moment().format('MM'),
        year: moment().format('YYYY'),
        frequency: 'monthly',
    };

    private hideProperty: boolean = false;

    private filteredData: any = [];

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
        const removedLevel = this.breadcrumb.pop();
        this.fetchSelectLevelData(removedLevel);
    }

    private onChageTimeline(date: any) {
        this.selectedDate = date;
        this.dataParams.month = moment(date).format('MM');
        this.dataParams.year = moment(date).format('YYYY');
        this.getStateList();
    }

    // --------------------------------------------------------------
    // Methods
    private getStateList() {
        const params: any = this.paramsIds;
        params.country_id = this.countryId;
        axios.all([
            perfomanceAPI.fetchStateCompetencyByCountryID(params, this.dataParams),
            perfomanceAPI.fetchCountrySubject(params, this.dataParams),
        ]).then(axios.spread((competency, subjects) => {
            this.competencyData = competency;
            this.subjectsList = subjects;
            this.isLoaded = true;
        }));

    }

    private selectLevelService(selectedLevel: any) {
        let serviceLevel = Promise.resolve([]);
        switch (selectedLevel.type) {
            case 'country':
                this.paramsIds.country_id = selectedLevel.id;
                serviceLevel = perfomanceAPI.fetchStateCompetencyByCountryID(this.paramsIds, this.dataParams);
                break;
            case 'state':
                this.paramsIds.state_id = selectedLevel.id;
                serviceLevel = perfomanceAPI.fetchDistrictCompetencyByStateID(this.paramsIds, this.dataParams);
                break;
            case 'system':
                this.paramsIds.group_id = selectedLevel.id;
                serviceLevel = perfomanceAPI.fetchSchoolCompetencyByDistrictID(this.paramsIds, this.dataParams);
                break;
            case 'school':
                this.paramsIds.school_id = selectedLevel.id;
                serviceLevel = perfomanceAPI.fetchClassCompetencyBySchoolID(this.paramsIds, this.dataParams);
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
        return selectedService.then((levelData: any) => {
            this.competencyData = levelData;
        });
    }

    private selectedLevelData(selectedLevel: any) {
        const isBreadcrumb = this.breadcrumb.indexOf(selectedLevel);
        if (isBreadcrumb !== -1) {
            this.breadcrumb = this.breadcrumb.slice(0, isBreadcrumb);
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

         perfomanceAPI.fetchStudentsByClassID(params).then((atcClassStudents) => {
           const studentsId: any = [];
           atcClassStudents.map((students: any) => {
                return studentsId.push(students.userId);
            });
           const filteredData: any = [];
           profileAPI.fetchUserProfiles(studentsId.toString()).then((profileList) => {
             profileList.map((profile) => {
                    const findProfile = atcClassStudents.find((item: any) => item.userId === profile.userId);
                    if (findProfile) {
                        filteredData.push(Object.assign({}, findProfile, profile));
                    }
                });
            });
           this.competencyData = filteredData;
         });
    }

}

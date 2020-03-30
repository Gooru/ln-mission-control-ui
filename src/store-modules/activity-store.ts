import { taxonomyAPI } from '@/providers/apis/taxonomy/taxonomy';
import { ClassificationModel } from '@/models/taxonomy/classification';
import { SubjectModel } from '@/models/taxonomy/subject';

export default ({
    namespaced: true,
    state: {
        categoryList: [],
        subjectList: [],
        courseList: [],
    },
    mutations: {
        fetchCategory(state: any, category: ClassificationModel[]) {
            state.categoryList = category;
        },
        fetchSubject(state: any, subject: SubjectModel[]) {
            state.subjectList = subject;
        },
        fetchCourse(state: any, course: any) {
            state.courseList = course;
        },
    },
    actions: {
        fetchCategory({commit}: {commit: any}) {
            taxonomyAPI.fetchTaxonomyClassifications().then((classification) => {
                commit('fetchCategory', classification);
            });
        },

        fetchSubject({commit}: {commit: any}, categoryId: string) {
            taxonomyAPI.fetchTaxonomySubjects(categoryId).then((subjects) => {
                commit('fetchSubject', subjects);
            });
        },

        fetchCourse({commit}: {commit: any}, subject: any) {
            taxonomyAPI.fetchTaxonomyCourse(subject).then((courses) => {
                commit('fetchCourse', courses);
            });
        },
    },
});

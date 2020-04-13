import {assessmentSerializer} from '@/providers/serializers/content/assessment';
import {collectionSerializer} from '@/providers/serializers/content/collection';
import {courseSerializer} from '@/providers/serializers/content/course';
import {unitSerializer} from '@/providers/serializers/content/unit';
import {lessonSerializer} from '@/providers/serializers/content/lesson';
import {questionSerializer} from '@/providers/serializers/content/question';
import {resourceSerializer} from '@/providers/serializers/content/resource';
import {rubricSerializer} from '@/providers/serializers/content/rubric';
import { competencySerializer } from '../competency/competency';
import { DEFAULT_CATALOG_STRING } from '@/utils/constants';

export class SearchSerializer {

  static get instance() {
    return this.INSTANCE;
  }
  private static INSTANCE = new SearchSerializer();

  public serializeLearningMapData(learningMapData: any) {
    const learningMapContents = learningMapData.contents;
    const assessmentContents = learningMapContents.assessment;
    const collectionContents = learningMapContents.collection;
    const courseContents = learningMapContents.course;
    const lessonContents = learningMapContents.lesson;
    const questionContents = learningMapContents.question;
    const resourceContents = learningMapContents.resource;
    const unitContents = learningMapContents.unit;
    const rubricContents = learningMapContents.rubric;
    const serializedAssessmentContents = assessmentContents.searchResults.map((assessment: any) => {
      return assessmentSerializer.serializeAssessment(assessment);
    });
    const serializedCollectionContents = collectionContents.searchResults.map((collection: any) => {
      return collectionSerializer.serializeCollection(collection);
    });

    const serializedCourseContents = courseContents.searchResults.map((course: any) => {
      return courseSerializer.serializeCourse(course);
    });

    const serializedQuestionContents = questionContents.searchResults.map((question: any) => {
      return questionSerializer.serializeQuestion(question);
    });

    const serializedResourceContents = resourceContents.searchResults.map((resource: any) => {
      return resourceSerializer.serializeResource(resource);
    });

    const serializedUnitContents = unitContents.searchResults.map((unit: any) => {
      return unitSerializer.serializeUnit(unit);
    });

    const serializedLessonContents = lessonContents.searchResults.map((lesson: any) => {
      return lessonSerializer.serializeLesson(lesson);
    });

    const serializedRubricContents = rubricContents.searchResults.map((rubric: any) => {
      return rubricSerializer.serializeRubric(rubric);
    });

    const signatureContents = learningMapData.signatureContents;

    const signatureAssessments = signatureContents.assessments;
    const signatureCollections = signatureContents.collections;
    const serializedSignatureAssessments = signatureAssessments.map((assessment: any) => {
      return assessmentSerializer.serializeSignatureAssessment(assessment);
    });

    const serializedSignatureCollections = signatureCollections.map((collection: any) => {
      return collectionSerializer.serializeSignatureCollection(collection);
    });

    const serializedLearningMapData = {
      contents: {
        collection: serializedCollectionContents,
        assessment: serializedAssessmentContents,
        course: serializedCourseContents,
        unit: serializedUnitContents,
        lesson: serializedLessonContents,
        resource: serializedResourceContents,
        question: serializedQuestionContents,
        rubric: serializedRubricContents,
      },
      totalCounts: {
        collection: learningMapContents.collection.totalHitCount,
        assessment: learningMapContents.assessment.totalHitCount,
        course: learningMapContents.course.totalHitCount,
        unit: learningMapContents.unit.totalHitCount,
        lesson: learningMapContents.lesson.totalHitCount,
        resource: learningMapContents.resource.totalHitCount,
        question: learningMapContents.question.totalHitCount,
        rubric: learningMapContents.rubric.totalHitCount,
      },
      signatureAssessments: serializedSignatureAssessments,
      signatureCollections: serializedSignatureCollections,
      prerequisites: competencySerializer.serializePrerequisites(learningMapData.prerequisites),
    };
    return serializedLearningMapData;
  }

  public serializeAggregation(payload: any) {
      const result: any = [];
      const aggregation = payload.aggregations ? payload.aggregations : [];
      if (aggregation.length) {
        aggregation.map((item: any) => {
          const normalizeText = DEFAULT_CATALOG_STRING[item.key];
          normalizeText.value = item.doc_count;
          result.push(normalizeText);
        });
      }
      return result;
  }

  private serializedPrerequisites(payload: any) {
    const prerequisitesData: any = [];
    if (payload.length) {
      payload.map((prerequitites: any) => {
        prerequisitesData.push({
          code: prerequitites.code,
          id: prerequitites.id,
          title: prerequitites.title,
        });
      });
    }
    return prerequisitesData;
  }

}

export const searchSerializer = SearchSerializer.instance;

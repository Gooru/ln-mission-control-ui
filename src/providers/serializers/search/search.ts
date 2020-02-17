import {assessmentSerializer} from '@/providers/serializers/content/assessment';
import {collectionSerializer} from '@/providers/serializers/content/collection';
import {courseSerializer} from '@/providers/serializers/content/course';
import {unitSerializer} from '@/providers/serializers/content/unit';
import {lessonSerializer} from '@/providers/serializers/content/lesson';
import {questionSerializer} from '@/providers/serializers/content/question';
import {resourceSerializer} from '@/providers/serializers/content/resource';
import {rubricSerializer} from '@/providers/serializers/content/rubric';
import { competencySerializer } from '../competency/competency';

export class SearchSerializer {
  private static INSTANCE = new SearchSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public serializeLearningMapData(learningMapData: any) {
    const learningMapContents = learningMapData.contents;
    const assessmentContents = learningMapContents.assessment;
    const collectionContents =  learningMapContents.collection;
    const courseContents = learningMapContents.course;
    const lessonContents = learningMapContents.lesson;
    const questionContents = learningMapContents.question;
    const resourceContents = learningMapContents.resource;
    const unitContents = learningMapContents.unit;
    const rubricContents = learningMapContents.rubric;
    const serializedAssessmentContents = assessmentContents.searchResults.map( (assessment: any) => {
      return assessmentSerializer.serializeAssessment(assessment);
    });
    const serializedCollectionContents = collectionContents.searchResults.map( (collection: any) => {
      return collectionSerializer.serializeCollection(collection);
    });

    const serializedCourseContents = courseContents.searchResults.map( (course: any) => {
      return courseSerializer.serializeCourse(course);
    });

    const serializedQuestionContents = questionContents.searchResults.map( (question: any) => {
      return questionSerializer.serializeQuestion(question);
    });

    const serializedResourceContents = resourceContents.searchResults.map( (resource: any) => {
      return resourceSerializer.serializeResource(resource);
    });

    const serializedUnitContents = unitContents.searchResults.map( (unit: any) => {
      return unitSerializer.serializeUnit(unit);
    });

    const serializedLessonContents = lessonContents.searchResults.map( (lesson: any) => {
      return lessonSerializer.serializeLesson(lesson);
    });

    const serializedRubricContents = rubricContents.searchResults.map( (rubric: any) => {
      return rubricSerializer.serializeRubric(rubric);
    });

    const signatureContents = learningMapData.signatureContents;

    const signatureAssessments = signatureContents.assessments;
    const signatureCollections = signatureContents.collections;
    const serializedSignatureAssessments = signatureAssessments.map( (assessment: any) => {
        return assessmentSerializer.serializeSignatureAssessment(assessment);
    });

    const serializedSignatureCollections = signatureCollections.map( (collection: any) => {
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
      signatureAssessments: serializedSignatureAssessments,
      signatureCollections: serializedSignatureCollections,
      prerequisites: competencySerializer.serializePrerequisites(learningMapData.prerequisites),
    };
    return serializedLearningMapData;
  }
}

export const searchSerializer = SearchSerializer.instance;

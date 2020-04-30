import {assessmentSerializer} from '@/providers/serializers/content/assessment';
import {collectionSerializer} from '@/providers/serializers/content/collection';
import {courseSerializer} from '@/providers/serializers/content/course';
import {unitSerializer} from '@/providers/serializers/content/unit';
import {lessonSerializer} from '@/providers/serializers/content/lesson';
import {questionSerializer} from '@/providers/serializers/content/question';
import {resourceSerializer} from '@/providers/serializers/content/resource';
import {rubricSerializer} from '@/providers/serializers/content/rubric';
import { competencySerializer } from '../competency/competency';
import { DEFAULT_CATALOG_STRING, TAXONOMY_LEVELS, DEFAULT_IMAGES_PATH } from '@/utils/constants';
import { taxonomySerializer } from '../content/taxonomy';
import { sessionService } from '@/providers/services/auth/session';

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

  /**
   * @function normalizeSearchLearningMapsContentInfo
   * Serialize each content type from the learning map API
   */
  public normalizeSearchLearningMapsContentInfo(contents: any) {
    const serializedContentData: any = {};
    const assessmentData: any = [];
    const collectionData: any = [];
    const courseData: any = [];
    const resourceData: any = [];
    const questionData: any = [];
    const unitData: any = [];
    const lessonData: any = [];
    const offlineActivityData: any = [];
    if (contents.assessment) {
      contents.assessment.searchResults.map((assessment: any) => {
        const assessmentInfo = assessmentSerializer.normalizeAssessment(assessment);
        assessmentInfo.id = assessment.id;
        assessmentInfo.description = assessment.learningObjective;
        assessmentInfo.creator = taxonomySerializer.normalizeOwner(assessment.creator);
        assessmentInfo.owner = taxonomySerializer.normalizeOwner(assessment.user);
        assessmentInfo.standards = taxonomySerializer
          .normalizeTaxonomyArray(
            assessment.taxonomy,
            TAXONOMY_LEVELS.ASSESSMENT,
          );
        assessmentData.push(assessmentInfo);
      });
    }

    if (contents.collection) {
      contents.collection.searchResults.map((collection: any) => {
        const collectionInfo = collectionSerializer.normalizeCollection(collection);
        collectionInfo.id = collection.id;
        collectionInfo.description = collection.learningObjective;
        collectionInfo.creator = taxonomySerializer.normalizeOwner(collection.creator);
        collectionInfo.owner = taxonomySerializer.normalizeOwner(collection.user);
        collectionInfo.standards = taxonomySerializer
        .normalizeTaxonomyArray(
            collection.taxonomy,
            TAXONOMY_LEVELS.COLLECTION,
          );
        collectionData.push(collectionInfo);
      });
    }

    if (contents.offlineActivity) {
      contents.offlineActivity.searchResults.map((offlineActivity: any) => {
        const offlineActivityInfo = this.normalizeOfflineActivity(
          offlineActivity,
        );
        offlineActivityInfo.id = offlineActivity.id;
        offlineActivityInfo.description = offlineActivity.learningObjective;
        offlineActivityInfo.creator = taxonomySerializer.normalizeOwner(
          offlineActivity.creator,
        );
        offlineActivityInfo.owner = taxonomySerializer.normalizeOwner(
          offlineActivity.user,
        );
        offlineActivityInfo.standards = taxonomySerializer
        .normalizeTaxonomyArray(
            offlineActivity.taxonomy,
            TAXONOMY_LEVELS.COLLECTION,
          );
        offlineActivityData.push(offlineActivityInfo);
      });
    }

    if (contents.course) {
      contents.course.searchResults.map((course: any) => {
        const courseInfo: any = courseSerializer.serializeCourse(course);
        courseInfo.id = course.id;
        courseInfo.description = course.description;
        courseInfo.creator = course.creator
          ? taxonomySerializer.normalizeOwner(course.creator)
          : {};
        courseInfo.owner = course.owner
          ? taxonomySerializer.normalizeOwner(course.owner)
          : {};
        courseInfo.standards = taxonomySerializer
        .normalizeTaxonomyArray(
            course.taxonomy,
            TAXONOMY_LEVELS.COURSE,
          );
        courseData.push(courseInfo);
      });
    }

    if (contents.resource) {
      contents.resource.searchResults.map((resource: any) => {
        const resourceInfo: any = resourceSerializer.normalizeResource(resource);
        resourceInfo.id = resource.id;
        resourceInfo.description = resource.description;
        resourceInfo.creator = resource.creator
          ? taxonomySerializer.normalizeOwner(resource.creator)
          : {};
        resourceInfo.owner = resource.user
          ? taxonomySerializer.normalizeOwner(resource.user)
          : {};
        resourceInfo.standards = taxonomySerializer
        .normalizeTaxonomyArray(
            resource.taxonomy,
            TAXONOMY_LEVELS.RESOURCE,
          );
        resourceData.push(resourceInfo);
      });
    }

    if (contents.question) {
      contents.question.searchResults.map((question: any) => {
        const questionInfo = questionSerializer.normalizeQuestion(question);
        questionInfo.id = question.id;
        questionInfo.description = question.description;
        questionInfo.creator = taxonomySerializer.normalizeOwner(question.creator);
        questionInfo.owner = taxonomySerializer.normalizeOwner(question.user);
        questionInfo.standards = taxonomySerializer
        .normalizeTaxonomyArray(
            question.taxonomy,
            TAXONOMY_LEVELS.QUESTION,
          );
        questionData.push(questionInfo);
      });
    }

    if (contents.unit) {
      contents.unit.searchResults.map((unit: any) => {
        const unitInfo: any = unitSerializer.serializeUnit(unit);
        unitInfo.id = unit.id;
        unitInfo.description = unit.learningObjective;
        unitInfo.creator = unit.creator
          ? taxonomySerializer.normalizeOwner(unit.creator)
          : {};
        unitInfo.owner = unit.owner
          ? taxonomySerializer.normalizeOwner(unit.owner)
          : {};
        unitInfo.standards = taxonomySerializer
        .normalizeTaxonomyArray(
            unitInfo.taxonomy,
            TAXONOMY_LEVELS.QUESTION,
          );
        unitData.push(unitInfo);
      });
    }

    if (contents.lesson) {
      contents.lesson.searchResults.map((lesson: any) => {
        const lessonInfo: any = lessonSerializer.serializeLesson(lesson);
        lessonInfo.id = lesson.id;
        lessonInfo.description = lesson.learningObjective;
        lessonInfo.creator = lesson.creator
          ? taxonomySerializer.normalizeOwner(lesson.creator)
          : {};
        lessonInfo.owner = lesson.owner
          ? taxonomySerializer.normalizeOwner(lesson.owner)
          : {};
        lessonInfo.standards = taxonomySerializer
        .normalizeTaxonomyArray(
            lessonInfo.taxonomy,
            TAXONOMY_LEVELS.QUESTION,
          );
        lessonData.push(lessonInfo);
      });
    }

    serializedContentData.assessment = assessmentData;
    serializedContentData.collection = collectionData;
    serializedContentData.course = courseData;
    serializedContentData.resource = resourceData;
    serializedContentData.question = questionData;
    serializedContentData.unit = unitData;
    serializedContentData.lesson = lessonData;
    serializedContentData.offlineActivity = offlineActivityData;
    serializedContentData.totalHitCount = {
      assessment : contents.assessment.totalHitCount,
      assessmentExternal : contents.assessmentExternal.totalHitCount,
      collectionExternal : contents.collectionExternal.totalHitCount,
      collection : contents.collection.totalHitCount,
      offlineActivity : contents.offlineActivity.totalHitCount,
      question : contents.question.totalHitCount,
      resource : contents.resource.totalHitCount,
      unit: contents.unit.totalHitCount,
      lesson: contents.lesson.totalHitCount,
      course: contents.course.totalHitCount,
    },
    serializedContentData.maxTotalHitCount = Math.max(
      contents.assessment.totalHitCount,
      contents.assessmentExternal.totalHitCount,
      contents.collectionExternal.totalHitCount,
      contents.collection.totalHitCount,
      contents.offlineActivity.totalHitCount,
      contents.question.totalHitCount,
      contents.resource.totalHitCount,
    );
    return serializedContentData;
  }

  /**
   * Normalize a offline Activity
   * @param {*} offlineActivityData
   * @returns {offline activity}
   */
  public normalizeOfflineActivity(collectionData: any) {
    const cdnUrls = sessionService.getCdnUrl();
    const contentCdnUrl = cdnUrls.content_cdn_url;
    const basePath =  contentCdnUrl;
    const appRootPath = window.location.href; // configuration appRootPath
    const userBasePath = cdnUrls.user_cdn_url;

    const thumbnailUrl = collectionData.thumbnail
      ? basePath + collectionData.thumbnail
      : DEFAULT_IMAGES_PATH.offlineActivity;
    const userThumbnailUrl = collectionData.userProfileImage
      ? userBasePath + collectionData.userProfileImage
      : DEFAULT_IMAGES_PATH.profile;
    const creatorThumbnailUrl = collectionData.creatorProfileImage
      ? userBasePath + collectionData.creatorProfileImage
      : DEFAULT_IMAGES_PATH.profile;
    const taxonomyInfo =
      (collectionData.taxonomySet &&
        collectionData.taxonomySet.curriculum &&
        collectionData.taxonomySet.curriculum.curriculumInfo) ||
      [];

    const course = collectionData.course || {};
    return {
      id: collectionData.id,
      title: collectionData.title,
      description: collectionData.description,
      type: collectionData.type ? collectionData.type : collectionData.format,
      thumbnailUrl,
      standards: taxonomySerializer.normalizeTaxonomyArray(collectionData, false),
      publishStatus: collectionData.publishStatus,
      learningObjectives: collectionData.languageObjective,
      resourceCount: collectionData.resourceCount || 0,
      questionCount: collectionData.questionCount || 0,
      remixCount: collectionData.scollectionRemixCount || 0,
      course: course.title,
      courseId: course.id,
      isVisibleOnProfile: collectionData.profileUserVisibility,
      owner: {
        id: collectionData.gooruUId,
        firstName: collectionData.userFirstName,
        lastName: collectionData.userLastName,
        avatarUrl: userThumbnailUrl,
        username: collectionData.usernameDisplay,
      },
      creator: {
        id: collectionData.creatorId,
        firstName: collectionData.creatorFirstname,
        lastName: collectionData.creatorLastname,
        avatarUrl: creatorThumbnailUrl,
        username: collectionData.creatornameDisplay,
      },
      taxonomySet: collectionData.taxonomySet,
      createdDate: collectionData.addDate,
      collaboratorIDs: collectionData.collaboratorIds,
      grade: collectionData.grade,
      instructionalModel: collectionData.instructionalMethod,
      lastModified: collectionData.lastModified,
      lastModifiedBy: collectionData.lastModifiedBy,
      license: collectionData.license,
      audience: collectionData.audience,
      keyPoints: collectionData.keyPoints,
      efficacy: collectionData.efficacy ? collectionData.efficacy : null,
      relevance: collectionData.relevance ? collectionData.relevance : null,
      engagement: collectionData.engagement ? collectionData.engagement : null,
    };
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

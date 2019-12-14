import {LessonModel} from '@/models/content/lesson';

export class LessonSerializer {
  private static INSTANCE = new LessonSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public serializeLesson(lesson: any): LessonModel {
    const result: LessonModel = {
      id: lesson.id,
      title: lesson.title,
    };
    return result;
  }

}

export const lessonSerializer = LessonSerializer.instance;

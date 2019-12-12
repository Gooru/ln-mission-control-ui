import {CourseModel} from '@/models/content/course';

export class CourseSerializer {
  private static INSTANCE = new CourseSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public serializeCourse(course: any): CourseModel {
    const result: CourseModel = {
      id: course.id,
      title: course.title,
    };
    return result;
  }

}

export const courseSerializer = CourseSerializer.instance;

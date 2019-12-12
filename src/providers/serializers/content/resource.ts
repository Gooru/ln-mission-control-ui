import {ResourceModel} from '@/models/content/resource';

export class ResourceSerializer {
  private static INSTANCE = new ResourceSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public serializeResource(resource: any): ResourceModel {
    const result: ResourceModel = {
      id: resource.id,
      title: resource.title,
      description: resource.description,
      subformat: resource.contentSubFormat,
    };
    return result;
  }

}

export const resourceSerializer = ResourceSerializer.instance;

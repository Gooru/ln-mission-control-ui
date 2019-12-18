import {UnitModel} from '@/models/content/unit';

export class UnitSerializer {
  private static INSTANCE = new UnitSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public serializeUnit(unit: any): UnitModel {
    const result: UnitModel = {
      id: unit.id,
      title: unit.title,
    };
    return result;
  }

}

export const unitSerializer = UnitSerializer.instance;

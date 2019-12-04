export class SearchSerializer {
  private static INSTANCE = new SearchSerializer();

  static get instance() {
    return this.INSTANCE;
  }
}

export const searchAPI = SearchSerializer.instance;

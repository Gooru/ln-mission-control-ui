import { http } from '@/providers/apis/http';
import { portfolioSerializer } from '@/providers/serializers/portfolio/portfolio';
import { PortfolioContent } from '@/models/portfolio/portfolio-content';
export class PortfolioAPI {

  private static INSTANCE = new PortfolioAPI();

  static get instance() {
    return this.INSTANCE;
  }

  private portfolioNamespace: string = 'api/ds/users/v2';

  public fetchPortfolioContents<T>(
    requestParams: object = {},
    contentBase: string = 'content',
  ): Promise<PortfolioContent[]> {
    const endpoint = `${this.portfolioNamespace}/${contentBase}/portfolio/items`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers, requestParams).then((response) => {
      return portfolioSerializer.serializePortfolioContents(response.data);
    });
  }

  public fetchPortfolioStatsBySubject(requestParams: object = {}) {
    const endpoint = `${this.portfolioNamespace}/learner/portfolio/stats/subject`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers, requestParams).then((response) => {
      return portfolioSerializer.serializePortfolioStatsBySubject(response.data);
    });
  }

  public fetchPortfolioStatsByDomain(requestParams: object = {}) {
    const endpoint = `${this.portfolioNamespace}/learner/portfolio/stats/subject/domain`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers, requestParams).then((response) => {
      return portfolioSerializer.serializePortfolioStatsByDomain(response.data);
    });
  }

  public fetchPortfolioStatsAllFacets(requestParams: object = {}) {
    const endpoint = `${this.portfolioNamespace}/learner/portfolio/stats`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers, requestParams).then((response) => {
      return portfolioSerializer.serializePortfolioStatsAllFacets(response.data);
    });
  }

}

export const portfolioAPI = PortfolioAPI.instance;

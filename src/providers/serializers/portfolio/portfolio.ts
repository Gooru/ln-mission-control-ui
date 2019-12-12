import { PortfolioContent } from '@/models/portfolio/portfolio-content';
import { PortfolioSubjectStat } from '@/models/stats/portfolio-subject';
import { PortfolioDomainStat } from '@/models/stats/portfolio-domain';
import { PortfolioCompetencyStat } from '@/models/stats/portfolio-competency';
import { sessionService } from '@/providers/services/auth/session';
import { DEFAULT_IMAGES_PATH } from '@/utils/constants';

export class PortfolioSerializer {
  private static INSTANCE = new PortfolioSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public serializePortfolioContents(portfolioContents: any) {
    const cdnUrls = sessionService.getCdnUrl();
    const contentCdnUrl = cdnUrls.content_cdn_url;
    const portfolioContentItems = portfolioContents.items ? portfolioContents.items.usageData : [];
    const serializedPortfolioContents: PortfolioContent[] = portfolioContentItems.map( (portfolioContent: any) => {
      const thumbnailUrl = portfolioContent.thumbnail ?
        contentCdnUrl + portfolioContent.thumbnail :
        `${window.location.origin}/` + DEFAULT_IMAGES_PATH[portfolioContent.type];
      const serializedPortfolioContent: PortfolioContent = {
          id: portfolioContent.id,
          title: portfolioContent.title,
          description: portfolioContent.learningObjective,
          questionCount: portfolioContent.questionCount || 0,
          resourceCount: portfolioContent.resourceCount || 0,
          taskCount: portfolioContent.taskCount || 0,
          score: portfolioContent.score || 0,
          sessionId: portfolioContent.sessionId,
          efficacy: portfolioContent.efficacy || 0.5,
          engagement: portfolioContent.engagement || 0.5,
          relevance: portfolioContent.relevance || 0.5,
          contentType: portfolioContent.type,
          subType: portfolioContent.subType,
          thumbnailUrl,
          activityTimestamp: portfolioContent.activityTimestamp,
          owner: portfolioContent.owner,
          status: portfolioContent.status,
          timespent: portfolioContent.timespent,
          updatedAt: portfolioContent.updatedAt,
        };
      return serializedPortfolioContent;
    });
    return serializedPortfolioContents;
  }

  public serializePortfolioStatsBySubject(portfolioStats: any) {
    const serializer = this;
    const learnerPortfolioStats = portfolioStats.learnerPortfolioStats || [];
    const serializedPortfolioStats: PortfolioDomainStat[] = learnerPortfolioStats.map( (subjectStat: any) => {
      return serializer.normalizeDomainStat(subjectStat);
    });
    return serializedPortfolioStats;
  }

  public serializePortfolioStatsByDomain(portfolioStats: any) {
    const serializer = this;
    const learnerPortfolioStats = portfolioStats.learnerPortfolioStats || [];
    const serializedPortfolioStats: PortfolioCompetencyStat[] = learnerPortfolioStats.map( (domainStat: any) => {
      return serializer.normalizeCompetencyStat(domainStat);
    });
    return serializedPortfolioStats;
  }

  public normalizeDomainStat(subjectStat: PortfolioDomainStat) {
    const normalizedSubjectStat: PortfolioDomainStat = {
      assessmentCount: subjectStat.assessmentCount,
      assessmentExternalCount: subjectStat.assessmentExternalCount,
      collectionCount: subjectStat.collectionCount,
      collectionExternalCount: subjectStat.collectionExternalCount,
      domainCode: subjectStat.domainCode,
      domainName: subjectStat.domainName,
      domainSeq: subjectStat.domainSeq,
      oaCount: subjectStat.oaCount,
      totalCount: subjectStat.assessmentCount +
        subjectStat.assessmentExternalCount +
        subjectStat.collectionCount +
        subjectStat.collectionExternalCount +
        subjectStat.oaCount,
    };
    return normalizedSubjectStat;
  }

  public normalizeCompetencyStat(domainStat: PortfolioCompetencyStat) {
    const normalizedDomainStat: PortfolioCompetencyStat = {
      assessmentCount: domainStat.assessmentCount,
      assessmentExternalCount: domainStat.assessmentExternalCount,
      collectionCount: domainStat.collectionCount,
      collectionExternalCount: domainStat.collectionExternalCount,
      competencyCode: domainStat.competencyCode,
      competencyName: domainStat.competencyName,
      competencySeq: domainStat.competencySeq,
      oaCount: domainStat.oaCount,
      totalCount: domainStat.assessmentCount +
        domainStat.assessmentExternalCount +
        domainStat.collectionCount +
        domainStat.collectionExternalCount +
        domainStat.oaCount,
    };
    return normalizedDomainStat;
  }
}

export const portfolioSerializer = PortfolioSerializer.instance;

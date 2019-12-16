import { PortfolioContent } from '@/models/portfolio/portfolio-content';
import { PortfolioSubjectStat } from '@/models/stats/portfolio-subject';
import { PortfolioDomainStat } from '@/models/stats/portfolio-domain';
import { PortfolioCompetencyStat } from '@/models/stats/portfolio-competency';
import { sessionService } from '@/providers/services/auth/session';
import { DEFAULT_IMAGES_PATH } from '@/utils/constants';

export class PortfolioSerializer {

  static get instance() {
    return this.INSTANCE;
  }
  private static INSTANCE = new PortfolioSerializer();

  public serializePortfolioContents(portfolioContents: any) {
    const serializer = this;
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
          efficacy: portfolioContent.efficacy || serializer.getRandomREEfValue(),
          engagement: portfolioContent.engagement || serializer.getRandomREEfValue(),
          relevance: portfolioContent.relevance || serializer.getRandomREEfValue(),
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

  public serializePortfolioStatsAllFacets(portfolioStats: any) {
    const serializer = this;
    const learnerPortfolioStats = portfolioStats.learnerPortfolioStats || [];
    const serializedPortfolioStats: PortfolioSubjectStat[] = learnerPortfolioStats.map( (subjectStat: any) => {
      return serializer.normalizeSubjectStat(subjectStat);
    });
    return serializedPortfolioStats;
  }

  public serializePortfolioStatsBySubject(portfolioStats: any) {
    const serializer = this;
    const learnerPortfolioStats = portfolioStats.learnerPortfolioStats || [];
    const serializedPortfolioStats: PortfolioDomainStat[] = learnerPortfolioStats.map( (domainStat: any) => {
      return serializer.normalizeDomainStat(domainStat);
    });
    return serializedPortfolioStats;
  }

  public serializePortfolioStatsByDomain(portfolioStats: any) {
    const serializer = this;
    const learnerPortfolioStats = portfolioStats.learnerPortfolioStats || [];
    const serializedPortfolioStats: PortfolioCompetencyStat[] = learnerPortfolioStats.map( (competencyStat: any) => {
      return serializer.normalizeCompetencyStat(competencyStat);
    });
    return serializedPortfolioStats;
  }

  public normalizeDomainStat(domainStat: PortfolioDomainStat) {
    const normalizedDomainStat: PortfolioDomainStat = {
      assessmentCount: domainStat.assessmentCount,
      assessmentExternalCount: domainStat.assessmentExternalCount,
      collectionCount: domainStat.collectionCount,
      collectionExternalCount: domainStat.collectionExternalCount,
      domainCode: domainStat.domainCode,
      domainName: domainStat.domainName,
      domainSeq: domainStat.domainSeq,
      oaCount: domainStat.oaCount,
      totalCount: domainStat.assessmentCount +
        domainStat.assessmentExternalCount +
        domainStat.collectionCount +
        domainStat.collectionExternalCount +
        domainStat.oaCount,
    };
    return normalizedDomainStat;
  }

  public normalizeCompetencyStat(competencyStat: PortfolioCompetencyStat) {
    const normalizedCompetencyStat: PortfolioCompetencyStat = {
      assessmentCount: competencyStat.assessmentCount,
      assessmentExternalCount: competencyStat.assessmentExternalCount,
      collectionCount: competencyStat.collectionCount,
      collectionExternalCount: competencyStat.collectionExternalCount,
      competencyCode: competencyStat.competencyCode,
      competencyName: competencyStat.competencyName,
      competencySeq: competencyStat.competencySeq,
      oaCount: competencyStat.oaCount,
      totalCount: competencyStat.assessmentCount +
        competencyStat.assessmentExternalCount +
        competencyStat.collectionCount +
        competencyStat.collectionExternalCount +
        competencyStat.oaCount,
    };
    return normalizedCompetencyStat;
  }

  private normalizeSubjectStat(subjectStat: any) {
    const normalizedSubjectStat: PortfolioSubjectStat = {
      subjectCode: subjectStat.subjectCode,
      subjectName: subjectStat.subjectName,
      classificationCode: subjectStat.classificationCode,
      classificationName: subjectStat.classificationName,
      subjectSeq: subjectStat.subjectSeq,
      classificationSeq: subjectStat.classificationSeq,
      collectionCount: subjectStat.collectionCount,
      assessmentCount: subjectStat.assessmentCount,
      assessmentExternalCount: subjectStat.assessmentExternalCount,
      collectionExternalCount: subjectStat.collectionExternalCount,
      oaCount: subjectStat.oaCount,
      totalCount: subjectStat.assessmentCount +
        subjectStat.assessmentExternalCount +
        subjectStat.collectionCount +
        subjectStat.collectionExternalCount +
        subjectStat.oaCount,
    };
    return normalizedSubjectStat;
  }

  private getRandomREEfValue() {
    return (Math.random() * (0.6 - 0.4) + 0.4).toFixed(1);
  }
}

export const portfolioSerializer = PortfolioSerializer.instance;

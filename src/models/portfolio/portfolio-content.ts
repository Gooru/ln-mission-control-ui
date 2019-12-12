import {User} from '@/models/profile/user';

export interface PortfolioContent {
  id: string;
  title: string;
  description?: string;
  questionCount?: number;
  resourceCount?: number;
  taskCount?: number;
  maxScore?: number;
  contentType: string;
  subType?: string;
  thumbnailUrl: string;
  updatedAt: number;
  timespent: number;
  score?: number;
  sessionId: string;
  status: string;
  efficacy?: number;
  engagement?: number;
  relevance?: number;
  activityTimestamp?: number;
  owner: User;
}

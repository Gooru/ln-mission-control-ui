export interface AssessmentModel {
  id: string;
  title: string;
  url?: string;
  format?: string;
  questionCount?: number;
  description?: string;
  thumbnailUrl: string;
}

export interface SessionModel {
  access_token: string;
  access_token_validity: number;
  cdn_urls: any;
  provided_at: number;
  user_id: string;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  user_category?: string;
  thumbnail?: string;
}

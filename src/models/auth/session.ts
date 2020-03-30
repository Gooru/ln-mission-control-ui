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
  isSuperAdmin?: boolean;
  permissions?: any;
  user_category?: string;
  thumbnail?: string;
  tenant?: TenantModel;
  thumbnail_url?: string;
  user_display_name?: string;
}

export interface TenantModel {
  tenant_id?: string;
}

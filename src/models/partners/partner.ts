export interface PartnerModel {
  partner_id: number;
  partner_name: string;
  partner_url?: string;
  partner_contact_name?: string;
  partner_contact_phone?: string;
  partner_logo?: string;
  partner_brief?: string;
  partner_shared_videos?: string[];
  partner_shared_links?: string[];
  active_users?: number;
  tenant_manager?: boolean;
}

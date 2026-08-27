export interface ComplaintTemplateItem {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CreateComplaintTemplateRequest {
  name: string;
}

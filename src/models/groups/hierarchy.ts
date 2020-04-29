interface GroupTenant {
  id: string;
  name: string;
}

export interface GroupHierarchy {
  id: number;
  name: string;
  description: string;
  tenants?: GroupTenant[];
}

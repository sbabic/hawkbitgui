export interface SoftwareModuleType {
  id: number;
  key: string;
  name: string;
  description: string;
  colour: string;
  deleted: boolean;
  maxAssignments: number;
  createdBy: string;
  createdAt: number;
  lastModifiedBy: string;
  lastModifiedAt: number;
  _links: Record<string, string>;
}

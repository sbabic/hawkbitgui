export interface DistributionSetType {
  id: number;
  name: string;
  description: string;
  key: string;
  colour: string;
  deleted: boolean;
  createdBy: string;
  createdAt: number;
  lastModifiedBy: string;
  lastModifiedAt: number;
  _links: Record<string, string>;
}

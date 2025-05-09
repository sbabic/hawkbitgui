export interface TargetFilter {
  id: number;
  name: string;
  query: string;
  autoAssignDistributionSet: number;
  autoAssignActionType: string;
  autoAssignWeight: number;
  confirmationRequired: boolean;
  createdBy: string;
  createdAt: number;
  lastModifiedBy: string;
  lastModifiedAt: number;
  _links: Record<string, string>;
}

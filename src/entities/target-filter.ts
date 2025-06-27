import { RolloutType } from './rollout';

export interface TargetFilter {
  id: number;
  name: string;
  query: string;
  autoAssignDistributionSet: number | null;
  autoAssignDistributionSetName: string | null;
  autoAssignActionType: RolloutType | null;
  autoAssignWeight: number | null;
  confirmationRequired: boolean | null;
  createdBy: string;
  createdAt: number;
  lastModifiedBy: string;
  lastModifiedAt: number;
  _links: {
    self: {
      href: string;
    };
    DS?: {
      href: string;
    };
  };
}

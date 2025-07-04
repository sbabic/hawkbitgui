import { Distribution, FilterFiql, Metadata, Target } from '@/entities';
import { ApiResponse } from '@/services/types';
import { TargetAction } from '@/entities/target-action';
import { ActionLog } from '@/entities/action-log';

export interface FetchTargetsInput {
  filters: FilterFiql[];
  queryParams?: { offset?: number; limit?: number; sort?: string; query?: string };
}

export type FetchTargetsOutput = {
  targets: Target[];
  totalTargets: number;
};

export interface CreateTargetInput {
  name: string;
  description?: string;
  controllerId: string;
  address?: string;
  securityToken?: string;
  requestAttributes?: boolean;
  targetType?: number;
}

export interface UpdateTargetInput {
  name: string;
  description?: string;
  controllerId: string;
  address?: string;
  securityToken?: string;
  requestAttributes?: boolean;
  targetType?: number;
}

export type GetTargetsResponse = ApiResponse<Target[]>;

export type GetAttributesResponse = Record<string, string>;

export type GetAttributesOutput = Record<string, string>;

export type GetInstalledDistributionResponse = Distribution;

export type GetInstalledDistributionOutput = Distribution;

export type GetAssignedDistributionResponse = Distribution;

export type GetAssignedDistributionOutput = Distribution;

export type GetMetadataResponse = ApiResponse<Metadata[]>;

export type GetMetadataOutput = Metadata[];

type MaintenanceWindow = {
  schedule: string;
  duration: string;
  timezone: string;
};

export type AssignConfig = {
  id: number | string;
  forcetime?: number;
  weight?: number;
  confirmationRequired?: boolean;
  type?: 'soft' | 'forced' | 'timeforced' | 'downloadonly';
  maintenanceWindow?: MaintenanceWindow;
};

export type AssignDistributionsToTargetInput = {
  controllerId: string;
  distributionsConfigs: AssignConfig[];
};

export type GetActionsResponse = ApiResponse<TargetAction[]>;

export type GetActionsOutput = TargetAction[];

export type GetActionLogResponse = ApiResponse<ActionLog[]>;

export type GetActionLogOutput = ActionLog[];

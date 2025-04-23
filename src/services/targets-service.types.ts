import { Distribution, FilterFiql, Metadata, Target } from '@/entities';
import { ApiResponse } from '@/services/types';

export interface FetchTargetsInput {
    filters: FilterFiql[];
}

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

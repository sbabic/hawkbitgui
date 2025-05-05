import { ApiResponse } from './types';
import { Distribution, FilterFiql } from '@/entities';

export type CreateDistributionSetInput = {
    name: string;
    description: string;
    version: string;
    locked: boolean;
    requiredMigrationStep: boolean;
    modules: { id: number }[];
    type: string;
};

export type CreateDistributionSetResponse = Distribution;

export interface GetDistributionSetsInput {
    filters: FilterFiql[];
}

export type GetDistributionSetsResponse = ApiResponse<Distribution[]>;

export type GetDistributionSetsOutput = Distribution[];

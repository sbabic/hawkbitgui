import { ApiResponse } from './types';
import { Distribution } from '@/entities';

export type CreateDistributionSetInput = {
    name: string;
    description: string;
    version: string;
    locked: boolean;
    requiredMigrationStep: boolean;
    modules: { id: number }[];
    type: string;
};

export type CreateDistributionSetResponse = ApiResponse<Distribution>;

export type GetDistributionSetsResponse = ApiResponse<Distribution[]>;

export type GetDistributionSetsOutput = Distribution[];

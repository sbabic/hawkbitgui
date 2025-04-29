import { ApiResponse } from './types';
import { DistributionSetType } from '@/entities/distribution-set-type';

export type CreateDistributionSetTypeInput = {
    name: string;
    description?: string;
    colour?: string;
    key: string;
    mandatorymodules: { id: number }[];
    optionalmodules: { id: number }[];
};

export type CreateDistributionSetTypeResponse = ApiResponse<DistributionSetType>;

export type GetDistributionSetTypesResponse = ApiResponse<DistributionSetType[]>;

export type GetDistributionSetTypesOutput = DistributionSetType[];

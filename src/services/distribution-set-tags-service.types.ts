import { ApiResponse } from './types';
import { DistributionTag } from '@/entities';

export type GetDistributionSetTagsResponse = ApiResponse<DistributionTag[]>;

export type GetDistributionSetTagsOutput = DistributionTag[];

export type GetTagsByDistributionIdResponse = DistributionTag[];

export type GetTagsByDistributionIdOutput = DistributionTag[];

export type DistributionSetTagsResponse = ApiResponse<DistributionTag[]>;

export type DistributionSetsOfTagResponse = ApiResponse<DistributionTag[]>;

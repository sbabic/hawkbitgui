import { ApiResponse } from './types';
import { DistributionTag } from '@/entities';

export type GetDistributionSetTagsResponse = ApiResponse<DistributionTag[]>;

export type GetDistributionSetTagsOutput = DistributionTag[];

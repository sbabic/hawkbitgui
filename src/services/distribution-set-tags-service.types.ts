import { ApiResponse } from './types';
import { DistributionTag, Tag } from '@/entities';

export type GetDistributionSetTagsResponse = ApiResponse<DistributionTag[]>;

export type GetDistributionSetTagsOutput = DistributionTag[];

export type GetTagsByDistributionIdResponse = DistributionTag[];

export type GetTagsByDistributionIdOutput = DistributionTag[];

export type DistributionSetTagsResponse = ApiResponse<DistributionTag[]>;

export type DistributionSetsOfTagResponse = ApiResponse<DistributionTag[]>;

export type CreateTagInput = {
  name: string;
  description: string;
  color?: string;
};

export type UpdateTagResponse = Tag;

export type UpdateTagInput = {
  id: number;
  name?: string;
  description?: string;
  color?: string;
};

import { Tag } from '@/entities';
import { ApiResponse } from '@/services/types';

export type GetTagsByControllerIdResponse = Tag[];

export type GetTagsByControllerIdOutput = Tag[];

export type GetTagsResponse = ApiResponse<Tag[]>;

export type GetTagsOutput = Tag[];

export type CreateTagResponse = Tag[];

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

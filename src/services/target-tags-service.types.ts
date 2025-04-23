import { Tag } from '@/entities';
import { ApiResponse } from '@/services/types';

export type GetTagsByControllerIdResponse = Tag[];

export type GetTagsByControllerIdOutput = Tag[];

export type GetTagsResponse = ApiResponse<Tag[]>;

export type GetTagsOutput = Tag[];

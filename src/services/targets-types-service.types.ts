import { ApiResponse } from '@/services/types';
import { TargetType } from '@/entities';

export type GetTargetsTypesResponse = ApiResponse<TargetType[]>;

export type CreateTypeResponse = TargetType[];

export type CreateTypeInput = {
  name: string;
  description: string;
  color?: string;
};

export type UpdateTypeInput = {
  id: number;
  name?: string;
  description?: string;
  color?: string;
};

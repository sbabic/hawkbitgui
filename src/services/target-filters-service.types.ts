import { ApiResponse } from './types';
import { TargetFilter } from '@/entities/target-filter';

export type CreateTargetFilterInput = {
  name: string;
  query: string;
};

export type GetTargetFiltersResponse = ApiResponse<TargetFilter[]>;

export type UpdateTargetFilterInput = {
  name: string;
  query: string;
};

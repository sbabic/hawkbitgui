import { ApiResponse } from './types';
import { TargetFilter } from '@/entities/target-filter';

export type CreateTargetFilterInput = {
  name: string;
  query: string;
};

export type FetchTargetFiltersInput = {
  queryParams?: { offset?: number; limit?: number; sort?: string; q?: string };
};

export type FetchTargetFiltersOutput = {
  targetFilters: TargetFilter[];
  totalTargetFilters: number;
};

export type GetTargetFiltersResponse = ApiResponse<TargetFilter[]>;

export type UpdateTargetFilterInput = {
  name: string;
  query: string;
};

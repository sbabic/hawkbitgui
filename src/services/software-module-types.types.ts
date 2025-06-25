import { SoftwareModuleType } from '@/entities/software-module-type';
import { ApiResponse } from './types';

export type GetSoftwareModuleTypesResponse = ApiResponse<SoftwareModuleType[]>;

export type CreateSoftwareModuleTypeInput = {
  name: string;
  description?: string;
  key: string;
  colour?: string;
  maxAssignments?: number;
};

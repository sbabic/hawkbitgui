import { ApiResponse } from './types';
import { SoftwareModule } from '@/entities/software-module';
export interface FetchSoftwareModulesInput {
  queryParams?: { q?: string; offset?: number; limit?: number; sort?: string };
}

export interface FetchSoftwareModulesOutput {
  softwareModules: SoftwareModule[];
  totalSoftwareModules: number;
}

export interface CreateSoftwareModuleInput {
  name: string;
  version: string;
  type: string;
  description?: string;
  vendor?: string;
  encrypted?: boolean;
}

export type GetSoftwareModulesResponse = ApiResponse<SoftwareModule[]>;

export type CreateSoftwareModuleResponse = SoftwareModule[];

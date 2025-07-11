import { Distribution } from '@/entities/distribution';
import axiosInstance from '@/lib/axios';
import {
  AssignModulesToDistributionSetInput,
  AssignTargetsToDistributionInput,
  CreateDistributionSetInput,
  CreateDistributionSetResponse,
  GetAssignedSoftwareModulesResponse,
  GetDistributionSetsInput,
  GetDistributionSetsOutput,
  GetDistributionSetsResponse,
  UnassignModulesToDistributionSetInput,
} from './distribution-sets-services.types';
import { FilterFiql, SoftwareModule } from '@/entities';
import { GetMetadataOutput, GetMetadataResponse } from '@/services/targets-service.types';

export interface DistributionSetsQueryParams {
  query?: string;
  offset?: number;
  limit?: number;
  sort?: string;
}

export class DistributionSetsService {
  static async fetchDistributionSets(input?: GetDistributionSetsInput, queryParams?: DistributionSetsQueryParams): Promise<GetDistributionSetsOutput> {
    try {
      const { query, ...restQueryParams } = queryParams ?? {};
      const fiqlQuery = FilterFiql.parseFiltersToFeedItemQueryLanguage(input?.filters || []);

      let q = '';
      if (query && query !== '') {
        q = query;
      } else {
        q = fiqlQuery;
      }

      const response = await axiosInstance.get<GetDistributionSetsResponse>(`/distributionsets`, {
        params: {
          ...restQueryParams,
          ...(q ? { q } : {}),
        },
      });
      return {
        distributionSets: response.data.content,
        totalDistributionSets: response.data.total,
      };
    } catch (error) {
      console.error('Failed to fetch distribution sets', error);
      throw error;
    }
  }

  static async createDistributionSet(data: CreateDistributionSetInput[]): Promise<Distribution> {
    try {
      const response = await axiosInstance.post<CreateDistributionSetResponse>(`/distributionsets`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to create distribution set', error);
      throw error;
    }
  }

  static async updateDistributionSet(distributionSetId: number, data: Partial<CreateDistributionSetInput>): Promise<Distribution> {
    try {
      const response = await axiosInstance.put<CreateDistributionSetResponse>(`/distributionsets/${distributionSetId}`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to create distribution set', error);
      throw error;
    }
  }

  static async deleteDistributionSet(id: number | string): Promise<void> {
    try {
      const response = await axiosInstance.delete(`/distributionsets/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete distribution set', error);
      throw error;
    }
  }

  static async getAssignedSoftwareModules(id: number | string): Promise<SoftwareModule[]> {
    const response = await axiosInstance.get<GetAssignedSoftwareModulesResponse>(`/distributionsets/${id}/assignedSM`);
    return response.data.content;
  }

  static async assignModulesToDistributionSet(data: AssignModulesToDistributionSetInput): Promise<void> {
    const { distributionSetId, softwareModuleIds } = data;
    const response = await axiosInstance.post(
      `/distributionsets/${distributionSetId}/assignedSM`,
      softwareModuleIds.map((id) => ({ id }))
    );
    return response.data;
  }

  static async unassignModulesToDistributionSet(data: UnassignModulesToDistributionSetInput): Promise<void> {
    const { distributionSetId, softwareModuleId } = data;
    const response = await axiosInstance.delete(`/distributionsets/${distributionSetId}/assignedSM/${softwareModuleId}`);
    return response.data;
  }

  static async getMetadata(distributionId: number | string): Promise<GetMetadataOutput> {
    try {
      const response = await axiosInstance.get<GetMetadataResponse>(`/distributionsets/${distributionId}/metadata`);
      return response.data.content;
    } catch (error) {
      console.error('Failed to get Metadata', error);
      throw error;
    }
  }

  static async createMetadata(distributionId: number | string, metadata: { key: string; value: string }): Promise<void> {
    try {
      await axiosInstance.post(`/distributionsets/${distributionId}/metadata`, [metadata]);
    } catch (error) {
      console.error('Failed to create Metadata', error);
      throw error;
    }
  }

  static async updateMetadata(distributionId: number | string, metadata: { key: string; value: string }): Promise<void> {
    try {
      await axiosInstance.put(`/distributionsets/${distributionId}/metadata/${metadata.key}`, { value: metadata.value });
    } catch (error) {
      console.error('Failed to update Metadata', error);
      throw error;
    }
  }

  static async deleteMetadata(distributionId: number | string, key: string): Promise<void> {
    try {
      await axiosInstance.delete(`/distributionsets/${distributionId}/metadata/${key}`);
    } catch (error) {
      console.error('Failed to delete Metadata', error);
      throw error;
    }
  }

  static async assignTargetsToDistributionSet(input: AssignTargetsToDistributionInput): Promise<void> {
    try {
      await axiosInstance.post(`/distributionsets/${input.distributionId}/assignedTargets`, input.targetConfigs);
    } catch (error) {
      console.error('Failed to assign targets to distribution set', error);
      throw error;
    }
  }
}

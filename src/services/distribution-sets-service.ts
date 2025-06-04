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
} from './distribution-sets-services.types';
import { FilterFiql, SoftwareModule } from '@/entities';
import { GetMetadataOutput, GetMetadataResponse } from '@/services/targets-service.types';

export class DistributionSetsService {
  static async fetchDistributionSets(input?: GetDistributionSetsInput): Promise<GetDistributionSetsOutput> {
    try {
      const fiqlQueryParam = FilterFiql.parseFiltersToFiqlQueryParam(input?.filters || []);
      const response = await axiosInstance.get<GetDistributionSetsResponse>(`/distributionsets?${fiqlQueryParam}`);
      return response.data.content;
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

import { FilterFiql, Target } from '@/entities';
import axiosInstance from '@/lib/axios';
import {
  AssignDistributionsToTargetInput,
  CreateTargetInput,
  FetchTargetsInput,
  FetchTargetsOutput,
  GetActionLogOutput,
  GetActionLogResponse,
  GetActionsOutput,
  GetActionsResponse,
  GetAssignedDistributionOutput,
  GetAssignedDistributionResponse,
  GetAttributesOutput,
  GetAttributesResponse,
  GetInstalledDistributionOutput,
  GetInstalledDistributionResponse,
  GetMetadataOutput,
  GetMetadataResponse,
  GetTargetsResponse,
  UpdateTargetInput,
} from '@/services/targets-service.types';

export class TargetsService {
  static async fetchTargets(input?: FetchTargetsInput): Promise<FetchTargetsOutput> {
    try {
      const { queryParams, filters } = input ?? {};
      const { query, ...restQueryParams } = queryParams ?? {};
      const fiqlQuery = FilterFiql.parseFiltersToFeedItemQueryLanguage(filters || []);

      let q = '';
      if (query && query !== '') {
        q = query;
      } else {
        q = fiqlQuery;
      }

      const response = await axiosInstance.get<GetTargetsResponse>(`/targets`, {
        params: {
          ...restQueryParams,
          ...(q ? { q } : {}),
        },
      });
      return {
        targets: response.data.content,
        totalTargets: response.data.total,
      };
    } catch (error) {
      console.error('Failed to fetch targets', error);
      throw error;
    }
  }

  static async createTarget(target: CreateTargetInput): Promise<Target> {
    try {
      const response = await axiosInstance.post(`/targets`, [target]);
      return response.data[0];
    } catch (error) {
      console.error('Failed to create target', error);
      throw error;
    }
  }

  static async updateTarget(target: UpdateTargetInput): Promise<Target> {
    try {
      const response = await axiosInstance.put(`/targets/${target.controllerId}`, target);
      return response.data;
    } catch (error) {
      console.error('Failed to update target', error);
      throw error;
    }
  }

  static async deleteTarget(controllerId: string): Promise<Target> {
    try {
      const response = await axiosInstance.delete(`/targets/${controllerId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete target', error);
      throw error;
    }
  }

  static async getAttributes(controllerId: string): Promise<GetAttributesOutput> {
    try {
      const response = await axiosInstance.get<GetAttributesResponse>(`/targets/${controllerId}/attributes`);
      return response.data;
    } catch (error) {
      console.error('Failed to get Attributes', error);
      throw error;
    }
  }

  static async getInstalledDistribution(controllerId: string): Promise<GetInstalledDistributionOutput> {
    try {
      const response = await axiosInstance.get<GetInstalledDistributionResponse>(`/targets/${controllerId}/installedDs`);
      return response.data;
    } catch (error) {
      console.error('Failed to get Installed Distribution', error);
      throw error;
    }
  }

  static async getAssignedDistribution(controllerId: string): Promise<GetAssignedDistributionOutput> {
    try {
      const response = await axiosInstance.get<GetAssignedDistributionResponse>(`/targets/${controllerId}/assignedDs`);
      return response.data;
    } catch (error) {
      console.error('Failed to get Assigned Distribution', error);
      throw error;
    }
  }

  static async getMetadata(controllerId: string): Promise<GetMetadataOutput> {
    try {
      const response = await axiosInstance.get<GetMetadataResponse>(`/targets/${controllerId}/metadata`);
      return response.data.content;
    } catch (error) {
      console.error('Failed to get Metadata', error);
      throw error;
    }
  }

  static async createMetadata(controllerId: string, metadata: { key: string; value: string }): Promise<void> {
    try {
      await axiosInstance.post(`/targets/${controllerId}/metadata`, [metadata]);
    } catch (error) {
      console.error('Failed to create Metadata', error);
      throw error;
    }
  }

  static async updateMetadata(controllerId: number | string, metadata: { key: string; value: string }): Promise<void> {
    try {
      await axiosInstance.put(`/targets/${controllerId}/metadata/${metadata.key}`, { value: metadata.value });
    } catch (error) {
      console.error('Failed to update Metadata', error);
      throw error;
    }
  }

  static async deleteMetadata(controllerId: string, key: string): Promise<void> {
    try {
      await axiosInstance.delete(`/targets/${controllerId}/metadata/${key}`);
    } catch (error) {
      console.error('Failed to delete Metadata', error);
      throw error;
    }
  }

  static async assignDistributionsToTarget(input: AssignDistributionsToTargetInput): Promise<void> {
    try {
      await axiosInstance.post(`/targets/${input.controllerId}/assignedDS`, input.distributionsConfigs);
    } catch (error) {
      console.error('Failed to assign distributions to target', error);
      throw error;
    }
  }

  static async fetchActions(controllerId: string): Promise<GetActionsOutput> {
    try {
      const response = await axiosInstance.get<GetActionsResponse>(`/targets/${controllerId}/actions?representation=full`);
      console.log('Fetched actions for target:', controllerId, response.data.content);
      return response.data.content;
    } catch (error) {
      console.error('Failed to fetch target actions', error);
      throw error;
    }
  }

  static async getActionLog(controllerId: string | number, actionId: string | number): Promise<GetActionLogOutput> {
    try {
      const response = await axiosInstance.get<GetActionLogResponse>(`/targets/${controllerId}/actions/${actionId}/status`);
      console.log('Fetched actions logs for target:', controllerId, response.data.content);
      return response.data.content;
    } catch (error) {
      console.error('Failed to fetch target actions', error);
      throw error;
    }
  }

  static async cancelAction(controllerId: string | number, actionId: string | number): Promise<void> {
    try {
      await axiosInstance.delete<GetActionLogResponse>(`/targets/${controllerId}/actions/${actionId}`);
      console.log(`Action ${actionId} cancelled for target ${controllerId}`);
    } catch (error) {
      console.error(`Failed to cancel action ${actionId} for target ${controllerId}`, error);
      throw error;
    }
  }

  static async targetForceAction(controllerId: string | number, actionId: string | number): Promise<GetActionLogOutput> {
    try {
      const response = await axiosInstance.put<GetActionLogResponse>(`/targets/${controllerId}/actions/${actionId}`, {
        forceType: 'forced',
      });
      console.log(`Force action ${actionId} executed for target ${controllerId}`);
      return response.data.content;
    } catch (error) {
      console.error(`Failed to force action ${actionId} for target ${controllerId}`, error);
      throw error;
    }
  }
}

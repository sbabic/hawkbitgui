import { FilterFiql, Target } from '@/entities';
import axiosInstance from '@/lib/axios';
import {
  AssignDistributionsToTargetInput,
  CreateTargetInput,
  FetchTargetsInput,
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
  static async fetchTargets(input?: FetchTargetsInput): Promise<Target[]> {
    try {
      const { query, filters } = input ?? {};
      let fiqlQueryParam = FilterFiql.parseFiltersToFiqlQueryParam(filters || []);
      if (query && query !== '') {
        fiqlQueryParam = `q=${query}`;
      }
      const response = await axiosInstance.get<GetTargetsResponse>(`/targets?${fiqlQueryParam}`);
      return response.data.content;
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
      const response = await axiosInstance.get<GetActionsResponse>(`/targets/${controllerId}/actions`);
      console.log('Fetched actions for target:', controllerId, response.data.content);
      return response.data.content;
    } catch (error) {
      console.error('Failed to fetch target actions', error);
      throw error;
    }
  }
}

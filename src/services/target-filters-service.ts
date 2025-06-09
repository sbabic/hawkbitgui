import axiosInstance from '@/lib/axios';
import { TargetFilter } from '@/entities/target-filter';
import { CreateTargetFilterInput, GetTargetFiltersResponse, UpdateTargetFilterInput } from './target-filters-service.types';
import { RolloutType } from '@/entities/rollout';

export class TargetFiltersService {
  static async fetchTargetFilters(): Promise<TargetFilter[]> {
    try {
      const response = await axiosInstance.get<GetTargetFiltersResponse>(`/targetfilters`);
      return response.data.content;
    } catch (error) {
      console.error('Failed to fetch target filters', error);
      throw error;
    }
  }

  static async createTargetFilter(data: CreateTargetFilterInput): Promise<TargetFilter> {
    try {
      const response = await axiosInstance.post(`/targetfilters`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to create target filter', error);
      throw error;
    }
  }

  static async deleteTargetFilter(filterId: number): Promise<void> {
    try {
      await axiosInstance.delete(`/targetfilters/${filterId}`);
    } catch (error) {
      console.error('Failed to delete target filter', error);
      throw error;
    }
  }

  static async updateTargetFilter(filterId: number, data: UpdateTargetFilterInput): Promise<TargetFilter> {
    try {
      const response = await axiosInstance.put(`/targetfilters/${filterId}`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update target filter', error);
      throw error;
    }
  }

  static async setAutoAssignDistributionSet(filterId: number, data: { distributionSetId: number; actionType: RolloutType }): Promise<TargetFilter> {
    const { distributionSetId, actionType } = data;
    try {
      const response = await axiosInstance.post(`/targetfilters/${filterId}/autoAssignDS`, {
        id: distributionSetId,
        type: actionType,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update target filter', error);
      throw error;
    }
  }

  static async deleteAutoAssignDistributionSet(filterId: number): Promise<TargetFilter> {
    try {
      const response = await axiosInstance.delete(`/targetfilters/${filterId}/autoAssignDS`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete auto assign distribution set', error);
      throw error;
    }
  }
}

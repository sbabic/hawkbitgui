import axiosInstance from '@/lib/axios';
import { TargetFilter } from '@/entities/target-filter';
import {
  CreateTargetFilterInput,
  FetchTargetFiltersInput,
  FetchTargetFiltersOutput,
  GetTargetFiltersResponse,
  UpdateTargetFilterInput,
} from './target-filters-service.types';
import { RolloutType } from '@/entities/rollout';
import { Representation } from './shared';

export class TargetFiltersService {
  static async fetchTargetFilters(input?: FetchTargetFiltersInput): Promise<FetchTargetFiltersOutput> {
    const { queryParams } = input ?? {};
    try {
      const response = await axiosInstance.get<GetTargetFiltersResponse>(`/targetfilters`, {
        params: { representation: Representation.FULL, ...queryParams },
      });
      const targetFilters = await this.mapResponseToDomain(response.data);
      return {
        targetFilters,
        totalTargetFilters: response.data.total,
      };
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

  private static async mapResponseToDomain(response: GetTargetFiltersResponse): Promise<TargetFilter[]> {
    const targetFilters = response.content.map((targetFilter) => {
      let autoAssignDistributionSetName: string | null = null;

      if (targetFilter._links.DS?.href) {
        try {
          const url = new URL(targetFilter._links.DS.href);
          const queryParams = new URLSearchParams(url.search);
          const qParam = queryParams.get('q');
          if (qParam) {
            const parts = qParam.split(';');
            const name = parts[0].split('==')[1];
            const version = parts[1].split('==')[1];
            autoAssignDistributionSetName = `${name}:${version}`;
          }
        } catch (error) {
          console.warn('Failed to parse distribution set URL:', targetFilter._links.DS.href, error);
        }
      }

      return {
        ...targetFilter,
        autoAssignDistributionSetName,
      };
    });
    return targetFilters;
  }
}

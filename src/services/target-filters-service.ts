import axiosInstance from '@/lib/axios';
import { TargetFilter } from '@/entities/target-filter';
import { CreateTargetFilterInput, GetTargetFiltersResponse } from './target-filters-service.types';

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
}

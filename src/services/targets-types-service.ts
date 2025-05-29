import { TargetType } from '@/entities';
import axiosInstance from '@/lib/axios';
import { CreateTypeInput, CreateTypeResponse, GetTargetsTypesResponse, UpdateTypeInput } from '@/services/targets-types-service.types';

export class TargetsTypesService {
  static async createType(input: CreateTypeInput): Promise<void> {
    try {
      await axiosInstance.post<CreateTypeResponse>(`/targettypes`, [{ ...input, colour: input.color }]);
    } catch (error) {
      console.error('Failed to create Type', error);
      throw error;
    }
  }

  static async fetchTargetsTypes(): Promise<TargetType[]> {
    try {
      const response = await axiosInstance.get<GetTargetsTypesResponse>(`/targettypes`);
      return response.data.content;
    } catch (error) {
      console.error('Failed to fetch targets types', error);
      throw error;
    }
  }

  static async deleteType(id: string | number): Promise<void> {
    try {
      await axiosInstance.delete(`/targettypes/${id}`);
    } catch (error) {
      console.error('Failed to delete Type', error);
      throw error;
    }
  }

  static async updateType(input: UpdateTypeInput): Promise<void> {
    try {
      await axiosInstance.put(`/targettypes/${input.id}`, { ...input, colour: input.color });
    } catch (error) {
      console.error('Failed to update type', error);
      throw error;
    }
  }
}

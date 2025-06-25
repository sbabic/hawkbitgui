import axiosInstance from '@/lib/axios';
import { SoftwareModule } from '@/entities/software-module';
import {
  CreateSoftwareModuleInput,
  CreateSoftwareModuleResponse,
  FetchSoftwareModulesInput,
  GetSoftwareModulesResponse,
} from './software-modules-service.types';
import { GetMetadataOutput, GetMetadataResponse } from './targets-service.types';

export class SoftwareModulesService {
  static async fetchSoftwareModules(input?: FetchSoftwareModulesInput): Promise<SoftwareModule[]> {
    const { queryParams } = input ?? {};
    const response = await axiosInstance.get<GetSoftwareModulesResponse>(`/softwaremodules`, { params: queryParams });
    return response.data.content;
  }

  static async createSoftwareModule(data: CreateSoftwareModuleInput[]): Promise<SoftwareModule[]> {
    const response = await axiosInstance.post<CreateSoftwareModuleResponse>(`/softwaremodules`, data);
    return response.data;
  }

  static async updateSoftwareModule(softwareModuleId: number, data: Partial<CreateSoftwareModuleInput>): Promise<SoftwareModule[]> {
    const response = await axiosInstance.put<CreateSoftwareModuleResponse>(`/softwaremodules/${softwareModuleId}`, data);
    return response.data;
  }

  static async deleteSoftwareModule(softwareModuleId: number): Promise<void> {
    await axiosInstance.delete(`/softwaremodules/${softwareModuleId}`);
  }

  static async getMetadata(softwareModuleId: number | string): Promise<GetMetadataOutput> {
    try {
      const response = await axiosInstance.get<GetMetadataResponse>(`/softwaremodules/${softwareModuleId}/metadata`);
      return response.data.content;
    } catch (error) {
      console.error('Failed to get Metadata', error);
      throw error;
    }
  }

  static async createMetadata(softwareModuleId: number | string, metadata: { key: string; value: string }): Promise<void> {
    try {
      await axiosInstance.post(`/softwaremodules/${softwareModuleId}/metadata`, [metadata]);
    } catch (error) {
      console.error('Failed to create Metadata', error);
      throw error;
    }
  }

  static async updateMetadata(softwareModuleId: number | string, metadata: { key: string; value: string }): Promise<void> {
    try {
      await axiosInstance.put(`/softwaremodules/${softwareModuleId}/metadata/${metadata.key}`, { value: metadata.value });
    } catch (error) {
      console.error('Failed to update Metadata', error);
      throw error;
    }
  }

  static async deleteMetadata(softwareModuleId: number | string, key: string): Promise<void> {
    try {
      await axiosInstance.delete(`/softwaremodules/${softwareModuleId}/metadata/${key}`);
    } catch (error) {
      console.error('Failed to delete Metadata', error);
      throw error;
    }
  }
}

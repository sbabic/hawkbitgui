import axiosInstance from '@/lib/axios';
import { CreateSoftwareModuleTypeInput, GetSoftwareModuleTypesResponse } from './software-module-types.types';
import { SoftwareModuleType } from '@/entities/software-module-type';

export class SoftwareModuleTypesService {
  static async fetchSoftwareModuleTypes(): Promise<SoftwareModuleType[]> {
    const response = await axiosInstance.get<GetSoftwareModuleTypesResponse>(`/softwaremoduletypes`);
    return response.data.content;
  }

  static async deleteType(softwareModuleTypeId: number): Promise<void> {
    await axiosInstance.delete(`/softwaremoduletypes/${softwareModuleTypeId}`);
  }

  static async createType(data: CreateSoftwareModuleTypeInput[]): Promise<void> {
    await axiosInstance.post(`/softwaremoduletypes`, data);
  }

  static async updateType(softwareModuleTypeId: number, data: Partial<CreateSoftwareModuleTypeInput>): Promise<void> {
    await axiosInstance.put(`/softwaremoduletypes/${softwareModuleTypeId}`, data);
  }
}

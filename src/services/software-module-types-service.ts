import axiosInstance from '@/lib/axios';
import { GetSoftwareModuleTypesResponse } from './software-module-types.types';
import { SoftwareModuleType } from '@/entities/software-module-type';

export class SoftwareModuleTypesService {
  static async fetchSoftwareModuleTypes(): Promise<SoftwareModuleType[]> {
    const response = await axiosInstance.get<GetSoftwareModuleTypesResponse>(`/softwaremoduletypes`);
    return response.data.content;
  }
}

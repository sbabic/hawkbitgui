import axiosInstance from '@/lib/axios';
import { SoftwareModule } from '@/entities/software-module';
import { CreateSoftwareModuleInput, CreateSoftwareModuleResponse, GetSoftwareModulesResponse } from './software-modules-service.types';

export class SoftwareModulesService {
    static async fetchSoftwareModules(): Promise<SoftwareModule[]> {
        const response = await axiosInstance.get<GetSoftwareModulesResponse>(`/softwaremodules`);
        return response.data.content;
    }

    static async createSoftwareModule(data: CreateSoftwareModuleInput[]): Promise<SoftwareModule[]> {
        const response = await axiosInstance.post<CreateSoftwareModuleResponse>(`/softwaremodules`, data);
        return response.data;
    }
}

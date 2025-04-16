import { TargetType } from '@/entities';
import axiosInstance from '@/lib/axios';
import { GetTargetsTypesResponse } from '@/services/targets-types-service.types';

export class TargetsTypesService {
    static async fetchTargetsTypes(): Promise<TargetType[]> {
        try {
            const response = await axiosInstance.get<GetTargetsTypesResponse>(`/targettypes`);
            return response.data.content;
        } catch (error) {
            console.error('Failed to fetch targets types', error);
            throw error;
        }
    }
}

import axiosInstance from '@/lib/axios';
import { DistributionSetType } from '@/entities/distribution-set-type';
import { CreateDistributionSetTypeInput, GetDistributionSetTypesResponse } from './distribution-set-types-service.types';

export class DistributionSetTypesService {
    static async fetchDistributionSetTypes(): Promise<DistributionSetType[]> {
        try {
            const response = await axiosInstance.get<GetDistributionSetTypesResponse>(`/distributionsettypes`);
            return response.data.content;
        } catch (error) {
            console.error('Failed to fetch distribution sets', error);
            throw error;
        }
    }

    static async createDistributionSetType(data: CreateDistributionSetTypeInput[]): Promise<DistributionSetType> {
        try {
            const response = await axiosInstance.post(`/distributionsettypes`, data);
            return response.data;
        } catch (error) {
            console.error('Failed to create distribution set type', error);
            throw error;
        }
    }
}

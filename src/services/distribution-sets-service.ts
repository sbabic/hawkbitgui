import { Distribution } from '@/entities/distribution';
import axiosInstance from '@/lib/axios';
import { CreateDistributionSetInput, GetDistributionSetsResponse } from './distribution-sets-services.types';

export class DistributionSetsService {
    static async fetchDistributionSets(): Promise<Distribution[]> {
        try {
            const response = await axiosInstance.get<GetDistributionSetsResponse>(`/distributionsets`);
            return response.data.content;
        } catch (error) {
            console.error('Failed to fetch distribution sets', error);
            throw error;
        }
    }

    static async createDistributionSet(data: CreateDistributionSetInput[]): Promise<Distribution> {
        try {
            const response = await axiosInstance.post(`/distributionsets`, data);
            return response.data;
        } catch (error) {
            console.error('Failed to create distribution set', error);
            throw error;
        }
    }
}

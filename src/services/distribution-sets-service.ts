import { Distribution } from '@/entities/distribution';
import axiosInstance from '@/lib/axios';
import { GetDistributionSetsResponse } from './distribution-sets-services.types';

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
}

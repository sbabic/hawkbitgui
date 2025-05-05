import axiosInstance from '@/lib/axios';
import { GetDistributionSetTagsOutput, GetDistributionSetTagsResponse } from '@/services/distribution-set-tags-service.types';

export class DistributionSetTagsService {
    static async getTags(): Promise<GetDistributionSetTagsOutput> {
        try {
            const response = await axiosInstance.get<GetDistributionSetTagsResponse>(`/distributionsettags`);
            return response.data.content;
        } catch (error) {
            console.error('Failed to fetch distribution sets', error);
            throw error;
        }
    }
}

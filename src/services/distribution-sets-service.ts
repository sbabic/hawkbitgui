import { Distribution } from '@/entities/distribution';
import axiosInstance from '@/lib/axios';
import {
    CreateDistributionSetInput,
    CreateDistributionSetResponse,
    GetDistributionSetsInput,
    GetDistributionSetsOutput,
    GetDistributionSetsResponse,
} from './distribution-sets-services.types';
import { FilterFiql } from '@/entities';

export class DistributionSetsService {
    static async fetchDistributionSets(input?: GetDistributionSetsInput): Promise<GetDistributionSetsOutput> {
        try {
            const fiqlQueryParam = FilterFiql.parseFiltersToFiqlQueryParam(input?.filters || []);
            const response = await axiosInstance.get<GetDistributionSetsResponse>(`/distributionsets?${fiqlQueryParam}`);
            return response.data.content;
        } catch (error) {
            console.error('Failed to fetch distribution sets', error);
            throw error;
        }
    }

    static async createDistributionSet(data: CreateDistributionSetInput[]): Promise<Distribution> {
        try {
            const response = await axiosInstance.post<CreateDistributionSetResponse>(`/distributionsets`, data);
            return response.data;
        } catch (error) {
            console.error('Failed to create distribution set', error);
            throw error;
        }
    }

    static async deleteDistributionSet(id: number | string): Promise<void> {
        try {
            const response = await axiosInstance.delete(`/distributionsets/${id}`);
            return response.data;
        } catch (error) {
            console.error('Failed to delete distribution set', error);
            throw error;
        }
    }
}

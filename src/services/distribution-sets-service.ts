import { Distribution } from '@/entities/distribution';
import axiosInstance from '@/lib/axios';
import {
    AssignModulesToDistributionSetInput,
    CreateDistributionSetInput,
    CreateDistributionSetResponse,
    GetAssignedSoftwareModulesResponse,
    GetDistributionSetsInput,
    GetDistributionSetsOutput,
    GetDistributionSetsResponse,
} from './distribution-sets-services.types';
import { FilterFiql, SoftwareModule } from '@/entities';

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

    static async getAssignedSoftwareModules(id: number | string): Promise<SoftwareModule[]> {
        const response = await axiosInstance.get<GetAssignedSoftwareModulesResponse>(`/distributionsets/${id}/assignedSM`);
        return response.data.content;
    }

    static async assignModulesToDistributionSet(data: AssignModulesToDistributionSetInput): Promise<void> {
        const { distributionSetId, softwareModuleIds } = data;
        const response = await axiosInstance.post(
            `/distributionsets/${distributionSetId}/assignedSM`,
            softwareModuleIds.map((id) => ({ id }))
        );
        return response.data;
    }
}

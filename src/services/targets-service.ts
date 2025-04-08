import { Target } from '@/entities';
import axiosInstance from '@/lib/axios';
import {
    CreateTargetInput,
    GetAssignedDistributionOutput,
    GetAssignedDistributionResponse,
    GetAttributesOutput,
    GetAttributesResponse,
    GetInstalledDistributionOutput,
    GetInstalledDistributionResponse,
    GetTargetsResponse,
} from '@/services/targets-service.types';

export class TargetsService {
    static async fetchTargets(): Promise<Target[]> {
        try {
            const response =
                await axiosInstance.get<GetTargetsResponse>(`/targets`);
            return response.data.content;
        } catch (error) {
            console.error('Failed to fetch targets', error);
            throw error;
        }
    }

    static async createTarget(target: CreateTargetInput): Promise<Target> {
        try {
            const response = await axiosInstance.post(`/targets`, [target]);
            return response.data[0];
        } catch (error) {
            console.error('Failed to create target', error);
            throw error;
        }
    }

    static async deleteTarget(controllerId: string): Promise<Target> {
        try {
            const response = await axiosInstance.delete(
                `/targets/${controllerId}`
            );
            return response.data;
        } catch (error) {
            console.error('Failed to delete target', error);
            throw error;
        }
    }

    static async getAttributes(
        controllerId: string
    ): Promise<GetAttributesOutput> {
        try {
            const response = await axiosInstance.get<GetAttributesResponse>(
                `/targets/${controllerId}/attributes`
            );
            return response.data;
        } catch (error) {
            console.error('Failed to get Attributes', error);
            throw error;
        }
    }

    static async getInstalledDistribution(
        controllerId: string
    ): Promise<GetInstalledDistributionOutput> {
        try {
            const response =
                await axiosInstance.get<GetInstalledDistributionResponse>(
                    `/targets/${controllerId}/installedDs`
                );
            return response.data;
        } catch (error) {
            console.error('Failed to get Installed Distribution', error);
            throw error;
        }
    }

    static async getAssignedDistribution(
        controllerId: string
    ): Promise<GetAssignedDistributionOutput> {
        try {
            const response =
                await axiosInstance.get<GetAssignedDistributionResponse>(
                    `/targets/${controllerId}/assignedDs`
                );
            return response.data;
        } catch (error) {
            console.error('Failed to get Assigned Distribution', error);
            throw error;
        }
    }
}

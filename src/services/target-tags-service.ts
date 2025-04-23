import axiosInstance from '@/lib/axios';
import { GetTagsByControllerIdOutput, GetTagsByControllerIdResponse, GetTagsOutput, GetTagsResponse } from '@/services/target-tags-service.types';

export class TargetTagsService {
    static async getTagsByControllerId(controllerId: string): Promise<GetTagsByControllerIdOutput> {
        try {
            const response = await axiosInstance.get<GetTagsByControllerIdResponse>(`/targets/${controllerId}/tags`);
            return response.data;
        } catch (error) {
            console.error('Failed to get Tags', error);
            throw error;
        }
    }

    static async getTags(): Promise<GetTagsOutput> {
        try {
            const response = await axiosInstance.get<GetTagsResponse>(`/targettags`);
            return response.data.content;
        } catch (error) {
            console.error('Failed to get Tags', error);
            throw error;
        }
    }

    static async unassignTagFromTarget(controllerId: string, tagId: number): Promise<void> {
        try {
            await axiosInstance.delete(`/targettags/${tagId}/assigned/${controllerId}`);
        } catch (error) {
            console.error('Failed to unassign tag', error);
            throw error;
        }
    }

    static async assignTagToTarget(controllerId: string, tagId: number): Promise<void> {
        try {
            await axiosInstance.post(`/targettags/${tagId}/assigned/${controllerId}`, {});
        } catch (error) {
            console.error('Failed to assign tag', error);
            throw error;
        }
    }
}

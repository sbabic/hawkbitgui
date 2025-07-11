import axiosInstance from '@/lib/axios';
import {
  DistributionSetsOfTagResponse,
  DistributionSetTagsResponse,
  GetDistributionSetTagsOutput,
  GetDistributionSetTagsResponse,
  GetTagsByDistributionIdOutput,
  CreateTagInput,
  UpdateTagInput,
  UpdateTagResponse,
} from '@/services/distribution-set-tags-service.types';
import { DistributionTag } from '@/entities';

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

  static async getTagsByDistributionId(distributionId: string | number): Promise<GetTagsByDistributionIdOutput> {
    try {
      const tagsResponse = await axiosInstance.get<DistributionSetTagsResponse>('/distributionsettags');
      const allTags = tagsResponse.data.content ?? [];

      const matchingTags: DistributionTag[] = [];

      const distributionSetsPromises = allTags.map(async (tag) => {
        const distributionSetsResponse = await axiosInstance.get<DistributionSetsOfTagResponse>(`/distributionsettags/${tag.id}/assigned`);
        const assignedDistributionSets = distributionSetsResponse.data.content ?? [];

        const isAssigned = assignedDistributionSets.some((ds) => ds.id === Number(distributionId));

        if (isAssigned) {
          matchingTags.push(tag);
        }
      });

      await Promise.all(distributionSetsPromises);

      return matchingTags;
    } catch (error) {
      console.error('Failed to get tags by distribution id:', error);
      throw error;
    }
  }

  static async unassignTagFromDistribution(distributionId: string | number, tagId: string | number): Promise<void> {
    try {
      await axiosInstance.delete(`/distributionsettags/${tagId}/assigned/${distributionId}`);
    } catch (error) {
      console.error('Failed to unassign tag', error);
      throw error;
    }
  }

  static async assignTagToDistribution(distributionId: string | number, tagId: string | number): Promise<void> {
    try {
      await axiosInstance.post(`/distributionsettags/${tagId}/assigned/${distributionId}`);
    } catch (error) {
      console.error('Failed to assign distribution sets to tag:', error);
      throw error;
    }
  }

  static async createTag(input: CreateTagInput): Promise<void> {
    try {
      await axiosInstance.post(`/distributionsettags`, [{ ...input, colour: input.color }]);
    } catch (error) {
      console.error('Failed to create Tag', error);
      throw error;
    }
  }

  static async deleteTag(tagId: number): Promise<void> {
    try {
      await axiosInstance.delete(`/distributionsettags/${tagId}`);
    } catch (error) {
      console.error('Failed to delete tag', error);
      throw error;
    }
  }

  static async updateTag(input: UpdateTagInput): Promise<void> {
    try {
      await axiosInstance.put<UpdateTagResponse>(`/distributionsettags/${input.id}`, { ...input, colour: input.color });
    } catch (error) {
      console.error('Failed to update tag', error);
      throw error;
    }
  }
}

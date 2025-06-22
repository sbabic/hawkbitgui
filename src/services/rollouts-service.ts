import { DeployGroupTarget, Rollout, RolloutDeployGroup } from '@/entities/rollout';
import axiosInstance from '@/lib/axios';
import { CreateRolloutInput, GetDeployGroupTargetsResponse, GetRolloutDeployGroupsResponse, GetRolloutsResponse } from './rollouts-service.types';

export const Representation = {
  COMPACT: 'compact',
  FULL: 'full',
} as const;
export type Representation = (typeof Representation)[keyof typeof Representation];

export interface RolloutsQueryParams {
  representation?: Representation;
}

export class RolloutsService {
  static async fetchRollout({ rolloutId }: { rolloutId: number }): Promise<Rollout> {
    try {
      const response = await axiosInstance.get<Rollout>(`/rollouts/${rolloutId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch rollout', error);
      throw error;
    }
  }

  static async fetchRollouts({ queryParams }: { queryParams?: RolloutsQueryParams }): Promise<Rollout[]> {
    try {
      const response = await axiosInstance.get<GetRolloutsResponse>(`/rollouts`, {
        params: queryParams && { ...queryParams },
      });
      return response.data.content;
    } catch (error) {
      console.error('Failed to fetch rollouts', error);
      throw error;
    }
  }

  static async createRollout(input: CreateRolloutInput): Promise<Rollout> {
    try {
      for (const key in input) {
        const value = input[key as keyof CreateRolloutInput];
        if (!value || value === '') {
          delete input[key as keyof CreateRolloutInput];
        }
      }

      const response = await axiosInstance.post('/rollouts', input);
      return response.data;
    } catch (error) {
      console.error('Failed to create rollout', error);
      throw error;
    }
  }

  static async updateRollout(rolloutId: number, input: Pick<CreateRolloutInput, 'name' | 'description'>): Promise<Rollout> {
    try {
      const response = await axiosInstance.put(`/rollouts/${rolloutId}`, input);
      return response.data;
    } catch (error) {
      console.error('Failed to update rollout', error);
      throw error;
    }
  }

  static async deleteRollout(rolloutId: number): Promise<void> {
    try {
      await axiosInstance.delete(`/rollouts/${rolloutId}`);
    } catch (error) {
      console.error('Failed to delete rollout', error);
      throw error;
    }
  }

  static async fetchRolloutDeployGroups({ rolloutId }: { rolloutId: number }): Promise<RolloutDeployGroup[]> {
    try {
      const response = await axiosInstance.get<GetRolloutDeployGroupsResponse>(`/rollouts/${rolloutId}/deploygroups`);
      return response.data.content;
    } catch (error) {
      console.error('Failed to fetch rollout deploy groups', error);
      throw error;
    }
  }

  static async fetchDeployGroupTargets({ rolloutId, deployGroupId }: { rolloutId: number; deployGroupId: number }): Promise<DeployGroupTarget[]> {
    try {
      const response = await axiosInstance.get<GetDeployGroupTargetsResponse>(`/rollouts/${rolloutId}/deploygroups/${deployGroupId}/targets`);
      return response.data.content;
    } catch (error) {
      console.error('Failed to fetch deploy group targets', error);
      throw error;
    }
  }

  static async startRollout(rolloutId: number): Promise<void> {
    try {
      await axiosInstance.post(`/rollouts/${rolloutId}/start`);
    } catch (error) {
      console.error('Failed to start rollout', error);
      throw error;
    }
  }

  static async resumeRollout(rolloutId: number): Promise<void> {
    try {
      await axiosInstance.post(`/rollouts/${rolloutId}/resume`);
    } catch (error) {
      console.error('Failed to resume rollout', error);
      throw error;
    }
  }

  static async pauseRollout(rolloutId: number): Promise<void> {
    try {
      await axiosInstance.post(`/rollouts/${rolloutId}/pause`);
    } catch (error) {
      console.error('Failed to resume rollout', error);
      throw error;
    }
  }

  static async approveRollout(rolloutId: number): Promise<void> {
    try {
      await axiosInstance.post(`/rollouts/${rolloutId}/approve`);
    } catch (error) {
      console.error('Failed to approve rollout', error);
      throw error;
    }
  }

  static async forceTriggerNextGroup(rolloutId: number): Promise<void> {
    try {
      await axiosInstance.post(`/rollouts/${rolloutId}/triggerNextGroup`);
    } catch (error) {
      console.error('Failed to force trigger next group', error);
      throw error;
    }
  }
}

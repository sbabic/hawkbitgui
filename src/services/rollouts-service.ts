import { Rollout } from '@/entities/rollout';
import axiosInstance from '@/lib/axios';
import { CreateRolloutInput, GetRolloutsResponse } from './rollouts-service.types';

export const Representation = {
    COMPACT: 'compact',
    FULL: 'full',
} as const;
export type Representation = (typeof Representation)[keyof typeof Representation];

export interface RolloutsQueryParams {
    representation?: Representation;
}

export class RolloutsService {
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
}

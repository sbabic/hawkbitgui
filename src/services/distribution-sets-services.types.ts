import { ApiResponse } from './types';
import { Distribution } from '@/entities';

export type GetDistributionSetsResponse = ApiResponse<Distribution[]>;

export type GetDistributionSetsOutput = Distribution[];

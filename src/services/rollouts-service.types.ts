import { Rollout, RolloutType } from '@/entities/rollout';
import { ApiResponse } from './types';

type SuccessCondition = {
    condition: 'THRESHOLD';
    expression: string;
};

type SuccessAction = {
    action: 'NEXTGROUP';
    expression: string;
};

type ErrorCondition = {
    condition: 'THRESHOLD';
    expression: string;
};

type ErrorAction = {
    action: 'PAUSE';
    expression: string;
};

export type CreateRolloutGroup = {
    name: string;
    description?: string;
    successCondition?: SuccessCondition;
    successAction?: SuccessAction;
    errorCondition?: ErrorCondition;
    errorAction?: ErrorAction;
    targetFilterQuery?: string;
    targetPercentage?: number;
    confirmationRequired?: boolean;
};

export type CreateRolloutInput = {
    name: string;
    description?: string;
    successCondition?: SuccessCondition;
    successAction?: SuccessAction;
    errorCondition?: ErrorCondition;
    errorAction?: ErrorAction;
    targetFilterQuery?: string;
    distributionSetId?: number;
    amountGroups?: number;
    forcetime?: number;
    startAt?: number;
    weight?: number;
    dynamic?: boolean;
    dynamicGroupTemplate?: {
        nameSuffix: string;
        targetCount: number;
    };
    confirmationRequired?: boolean;
    type?: RolloutType;
    groups?: CreateRolloutGroup[];
};

export type GetRolloutsResponse = ApiResponse<Rollout[]>;

export type GetRolloutsOutput = Rollout[];

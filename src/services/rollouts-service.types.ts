import { Rollout, RolloutType } from '@/entities/rollout';
import { ApiResponse } from './types';

export const Action = {
    NEXTGROUP: 'NEXTGROUP',
    PAUSE: 'PAUSE',
} as const;
export type Action = (typeof Action)[keyof typeof Action];

export const Condition = {
    THRESHOLD: 'THRESHOLD',
} as const;
export type Condition = (typeof Condition)[keyof typeof Condition];

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

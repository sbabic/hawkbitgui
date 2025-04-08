import { Distribution, Target } from '@/entities';

interface Link {
    href: string;
    hreflang?: string;
    title?: string;
    type?: string;
    deprecation?: string;
    profile?: string;
    name?: string;
    templated?: boolean;
}

export interface CreateTargetInput {
    name: string;
    description?: string;
    controllerId: string;
    address?: string;
    securityToken?: string;
    requestAttributes?: boolean;
    targetType?: number;
}

export interface GetTargetsResponse {
    content: Target[];
    total: number;
    size: number;
    _links: {
        [key: string]: Link;
    };
}

export type GetAttributesResponse = Record<string, string>;

export type GetAttributesOutput = Record<string, string>;

export type GetInstalledDistributionResponse = Distribution;

export type GetInstalledDistributionOutput = Distribution;

export type GetAssignedDistributionResponse = Distribution;

export type GetAssignedDistributionOutput = Distribution;

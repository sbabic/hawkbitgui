import { Distribution, Metadata, Target } from '@/entities';

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

export interface ApiResponse<T> {
    content: T;
    total: number;
    size: number;
    _links: {
        [key: string]: Link;
    };
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

export type GetTargetsResponse = ApiResponse<Target[]>;

export type GetAttributesResponse = Record<string, string>;

export type GetAttributesOutput = Record<string, string>;

export type GetInstalledDistributionResponse = Distribution;

export type GetInstalledDistributionOutput = Distribution;

export type GetAssignedDistributionResponse = Distribution;

export type GetAssignedDistributionOutput = Distribution;

export type GetMetadataResponse = ApiResponse<Metadata[]>;

export type GetMetadataOutput = Metadata[];

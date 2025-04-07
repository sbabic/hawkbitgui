import { Target } from '@/entities';

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

export interface GetTargetsResponse {
    content: Target[];
    total: number;
    size: number;
    _links: {
        [key: string]: Link;
    };
}

export type GetAttributesResponse = Record<string, string>;

export interface CreateTargetInput {
    /**
     * The name of the entity
     */
    name: string;

    /**
     * The description of the entity (optional)
     */
    description?: string;

    /**
     * Controller ID
     */
    controllerId: string;

    /**
     * The last known address URI of the target.
     * Includes information if the target is connected either directly (DDI) through HTTP
     * or indirectly (DMF) through amqp (optional)
     */
    address?: string;

    /**
     * Pre-Shared key that allows targets to authenticate at
     * Direct Device Integration API if enabled in the tenant settings (optional)
     */
    securityToken?: string;

    /**
     * Request re-transmission of target attributes (optional)
     */
    requestAttributes?: boolean;

    /**
     * ID of the target type (optional)
     */
    targetType?: number;
}

export type GetAttributesOutput = Record<string, string>;

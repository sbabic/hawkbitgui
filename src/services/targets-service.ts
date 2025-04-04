import { Target } from '@/entities';
import axios from 'axios';
import { environment } from '@/config/env';

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

export class TargetsService {
    static async fetchTargets(): Promise<Target[]> {
        try {
            const response = await axios.get<GetTargetsResponse>(
                `${environment.hawkbitApiUrl}/rest/v1/targets`,
                {
                    headers: {
                        Authorization: `Basic ${Buffer.from(`admin:admin`).toString('base64')}`,
                        Accept: 'application/json, application/hal+json',
                    },
                }
            );
            return response.data.content;
        } catch (error) {
            console.error('Failed to fetch targets', error);
            throw error;
        }
    }

    static async createTarget(target: CreateTargetInput): Promise<Target> {
        console.log('target', target);
        console.log('environment.hawkbitApiUr', environment.hawkbitApiUrl);

        try {
            const response = await axios.post(
                `${environment.hawkbitApiUrl}/rest/v1/targets`,
                [target],
                {
                    headers: {
                        Authorization: `Basic ${Buffer.from(`admin:admin`).toString('base64')}`,
                        Accept: 'application/json, application/hal+json',
                    },
                }
            );
            return response.data[0];
        } catch (error) {
            console.error('Failed to create target', error);
            throw error;
        }
    }

    static async deleteTarget(controllerId: string): Promise<Target> {
        try {
            const response = await axios.delete(
                `${environment.hawkbitApiUrl}/rest/v1/targets/${controllerId}`,
                {
                    headers: {
                        Authorization: `Basic ${Buffer.from(`admin:admin`).toString('base64')}`,
                        Accept: 'application/json, application/hal+json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Failed to delete target', error);
            throw error;
        }
    }
}

import { isSoftwareModule, SoftwareModule } from '@/entities/software-module';

export interface Distribution {
  id: number;
  name: string;
  description: string;
  version: string;
  type: string;
  typeName: string;
  complete: boolean;
  locked?: boolean;
  deleted: boolean;
  valid: boolean;
  requiredMigrationStep: boolean;
  modules: SoftwareModule[];
  createdBy: string;
  createdAt: number;
  lastModifiedBy: string;
  lastModifiedAt: number;
}

export function isDistribution(obj: any): obj is Distribution {
  if (typeof obj !== 'object' || obj === null) {
    console.warn('Invalid distribution: not an object');
    return false;
  }

  const validations = [
    ['id', typeof obj.id === 'number'],
    ['name', typeof obj.name === 'string'],
    ['description', typeof obj.description === 'string'],
    ['version', typeof obj.version === 'string'],
    ['type', typeof obj.type === 'string'],
    ['typeName', typeof obj.typeName === 'string'],
    ['complete', typeof obj.complete === 'boolean'],
    ['locked', obj.locked === undefined || typeof obj.locked === 'boolean'],
    ['deleted', typeof obj.deleted === 'boolean'],
    ['valid', typeof obj.valid === 'boolean'],
    ['requiredMigrationStep', typeof obj.requiredMigrationStep === 'boolean'],
    ['modules', Array.isArray(obj.modules) && obj.modules.every((mod: any) => isSoftwareModule(mod))],
    ['createdBy', typeof obj.createdBy === 'string'],
    ['createdAt', typeof obj.createdAt === 'number'],
    ['lastModifiedBy', typeof obj.lastModifiedBy === 'string'],
    ['lastModifiedAt', typeof obj.lastModifiedAt === 'number'],
  ];

  const failed = validations.filter(([_, valid]) => !valid);
  if (failed.length > 0) {
    console.warn(
      'Invalid distribution fields:',
      failed.map(([key]) => key)
    );
    return false;
  }

  return true;
}

export function isDistributionRecord(value: unknown): value is Record<string, Distribution> {
  if (typeof value !== 'object' || value === null) return false;

  return Object.entries(value).every(([key, val]) => typeof key === 'string' && isDistribution(val));
}

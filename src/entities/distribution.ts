import { isSoftwareModule, SoftwareModule } from '@/entities/software-module';

export interface Distribution {
  id: number;
  name: string;
  description: string;
  version: string;
  type: string;
  typeName: string;
  complete: boolean;
  locked: boolean;
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
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.version === 'string' &&
    typeof obj.type === 'string' &&
    typeof obj.typeName === 'string' &&
    typeof obj.complete === 'boolean' &&
    typeof obj.locked === 'boolean' &&
    typeof obj.deleted === 'boolean' &&
    typeof obj.valid === 'boolean' &&
    typeof obj.requiredMigrationStep === 'boolean' &&
    Array.isArray(obj.modules) &&
    obj.modules.every((mod: any) => isSoftwareModule(mod)) &&
    typeof obj.createdBy === 'string' &&
    typeof obj.createdAt === 'number' &&
    typeof obj.lastModifiedBy === 'string' &&
    typeof obj.lastModifiedAt === 'number'
  );
}

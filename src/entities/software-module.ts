export interface SoftwareModule {
  id: number;
  name: string;
  description: string;
  version: string;
  type: string;
  typeName: string;
  vendor: string;
  encrypted: boolean;
  locked: boolean;
  deleted: boolean;
  _links: Record<string, string>;
  createdBy: string;
  createdAt: number;
  lastModifiedBy: string;
  lastModifiedAt: number;
}

export function isSoftwareModule(obj: any): obj is SoftwareModule {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.version === 'string' &&
    typeof obj.type === 'string' &&
    typeof obj.typeName === 'string' &&
    typeof obj.vendor === 'string' &&
    typeof obj.encrypted === 'boolean' &&
    typeof obj.locked === 'boolean' &&
    typeof obj.deleted === 'boolean' &&
    typeof obj._links === 'object' &&
    obj._links !== null &&
    Object.values(obj._links).every((v) => typeof v === 'string') &&
    typeof obj.createdBy === 'string' &&
    typeof obj.createdAt === 'number' &&
    typeof obj.lastModifiedBy === 'string' &&
    typeof obj.lastModifiedAt === 'number'
  );
}

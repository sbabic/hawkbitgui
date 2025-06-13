export type LinkMap = Record<string, { href: string }>;

export interface SoftwareModule {
  id: number;
  name: string;
  description: string;
  version: string;
  type: string;
  typeName: string;
  vendor: string;
  encrypted: boolean;
  locked?: boolean;
  deleted: boolean;
  _links?: LinkMap;
  createdBy: string;
  createdAt: number;
  lastModifiedBy: string;
  lastModifiedAt: number;
}

export function isSoftwareModule(obj: any): obj is SoftwareModule {
  if (typeof obj !== 'object' || obj === null) {
    console.warn('Invalid software module: not an object');
    return false;
  }

  const validations: [string, boolean][] = [
    ['id', typeof obj.id === 'number'],
    ['name', typeof obj.name === 'string'],
    ['description', typeof obj.description === 'string'],
    ['version', typeof obj.version === 'string'],
    ['type', typeof obj.type === 'string'],
    ['typeName', typeof obj.typeName === 'string'],
    ['vendor', typeof obj.vendor === 'string'],
    ['encrypted', typeof obj.encrypted === 'boolean'],
    ['locked', obj.locked === undefined || typeof obj.locked === 'boolean'],
    ['deleted', typeof obj.deleted === 'boolean'],
    [
      '_links',
      obj._links === undefined ||
        (typeof obj._links === 'object' &&
          obj._links !== null &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          Object.values(obj._links).every((v) => typeof v === 'object' && v !== null && typeof v.href === 'string')),
    ],
    ['createdBy', typeof obj.createdBy === 'string'],
    ['createdAt', typeof obj.createdAt === 'number'],
    ['lastModifiedBy', typeof obj.lastModifiedBy === 'string'],
    ['lastModifiedAt', typeof obj.lastModifiedAt === 'number'],
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const failed = validations.filter(([_, valid]) => !valid);
  if (failed.length > 0) {
    console.warn(
      'Invalid software module fields:',
      failed.map(([key]) => key)
    );
    return false;
  }

  return true;
}

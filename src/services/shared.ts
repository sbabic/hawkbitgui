export const Representation = {
  COMPACT: 'compact',
  FULL: 'full',
} as const;
export type Representation = (typeof Representation)[keyof typeof Representation];

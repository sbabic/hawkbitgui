'use client';

import ListWithTitle from '@/app/components/list-with-title';

export interface DistributionDetailsProps {
  id: number;
  name: string;
  description: string;
  version: string;
  typeName: string;
  complete: boolean;
  locked?: boolean;
  deleted: boolean;
  valid: boolean;
  requiredMigrationStep: boolean;
  createdBy: string;
  createdAt: number;
  lastModifiedBy: string;
  lastModifiedAt: number;
}

export default function DistributionDetails({
  id,
  name,
  description,
  version,
  typeName,
  complete,
  locked,
  deleted,
  valid,
  requiredMigrationStep,
  createdBy,
  createdAt,
  lastModifiedBy,
  lastModifiedAt,
}: DistributionDetailsProps) {
  const items = [
    { title: 'ID', value: id },
    { title: 'Name', value: name },
    { title: 'Description', value: description },
    { title: 'Version', value: version },
    { title: 'Type Name', value: typeName },
    { title: 'Complete', value: complete ? 'Yes' : 'No' },
    { title: 'Locked', value: locked ? 'Yes' : 'No' },
    { title: 'Deleted', value: deleted ? 'Yes' : 'No' },
    { title: 'Valid', value: valid ? 'Yes' : 'No' },
    { title: 'Requires Migration Step', value: requiredMigrationStep ? 'Yes' : 'No' },
    { title: 'Created By', value: createdBy },
    { title: 'Created At', value: new Date(createdAt).toLocaleString() },
    { title: 'Last Modified By', value: lastModifiedBy },
    { title: 'Last Modified At', value: new Date(lastModifiedAt).toLocaleString() },
  ];

  return <ListWithTitle title='Distribution Details' items={items} />;
}

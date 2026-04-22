import { TotalTargetCountStatus } from '@/entities/rollout';
import styles from './styles.module.scss';
import { getTotalTargetStatusIcon, getTotalTargetStatusLabel } from '@/app/x/rollout/utils/utils';

interface TotalTargetsPerStatusProps {
  status: TotalTargetCountStatus;
  count: number;
}

function TotalTargetsPerStatus({ status, count }: TotalTargetsPerStatusProps) {
  const statusIcon = getTotalTargetStatusIcon(status);
  const statusLabel = getTotalTargetStatusLabel(status);

  return (
    <div className={`${styles.container} ${styles[status]}`}>
      {statusIcon}
      <p>
        {count} {statusLabel}
      </p>
    </div>
  );
}

interface TotalTargetsPerStatusCellProps {
  totalTargetsPerStatus: Record<TotalTargetCountStatus, number> | undefined;
}

export function TotalTargetsPerStatusCell({ totalTargetsPerStatus }: TotalTargetsPerStatusCellProps) {
  if (!totalTargetsPerStatus) {
    return null;
  }

  const nonZeroTargetsPerStatus = Object.entries(totalTargetsPerStatus).filter(([, count]) => count !== 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {nonZeroTargetsPerStatus.map(([status, count]) => (
        <TotalTargetsPerStatus key={status} status={status as TotalTargetCountStatus} count={count} />
      ))}
    </div>
  );
}

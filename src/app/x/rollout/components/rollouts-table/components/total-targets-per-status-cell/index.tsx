import { TotalTargetCountStatus } from '@/entities/rollout';
import styles from './styles.module.scss';
import NotStartedIcon from '@/app/components/icons/not-started-icon';
import CircleDotIcon from '@/app/components/icons/circle-dot-icon';
import CircleErrorIcon from '@/app/components/icons/circle-error-icon';
import CircleCheckMarkIcon from '@/app/components/icons/circle-check-mark-icon';

interface TotalTargetsPerStatusProps {
  status: TotalTargetCountStatus;
  count: number;
}

function TotalTargetsPerStatus({ status, count }: TotalTargetsPerStatusProps) {
  const statusIconMapper: Record<TotalTargetCountStatus, React.ReactElement | null> = {
    running: <CircleDotIcon />,
    notstarted: <NotStartedIcon />,
    scheduled: <div className={styles.scheduledDot}></div>,
    cancelled: <div className={styles.cancelledDot}></div>,
    finished: <CircleCheckMarkIcon />,
    error: <CircleErrorIcon />,
  };

  const statusTextMapper: Record<TotalTargetCountStatus, string> = {
    running: 'Running',
    notstarted: 'Not Started',
    scheduled: 'Scheduled',
    cancelled: 'Cancelled',
    finished: 'Finished',
    error: 'Error',
  };

  return (
    <div className={`${styles.container} ${styles[status]}`}>
      {statusIconMapper[status]}
      <p>
        {count} {statusTextMapper[status]}
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

  for (const status in totalTargetsPerStatus) {
    const statusKey = status as TotalTargetCountStatus;
    if (totalTargetsPerStatus[statusKey] === 0) {
      delete totalTargetsPerStatus[statusKey];
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {Object.entries(totalTargetsPerStatus).map(([status, count]) => (
        <TotalTargetsPerStatus key={status} status={status as TotalTargetCountStatus} count={count} />
      ))}
    </div>
  );
}

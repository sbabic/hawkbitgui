import { TotalTargetCountStatus } from '@/entities/rollout';
import styles from './styles.module.scss';
import NotStartedIcon from '@/app/components/icons/not-started-icon';
import CircleDotIcon from '@/app/components/icons/circle-dot-icon';
import CircleErrorIcon from '@/app/components/icons/circle-error-icon';
import CircleCheckMarkIcon from '@/app/components/icons/circle-check-mark-icon';

interface TotalTargetsPerStatusCellProps {
  status: TotalTargetCountStatus;
  count: number;
}

export function TotalTargetsPerStatusCell({ status, count }: TotalTargetsPerStatusCellProps) {
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

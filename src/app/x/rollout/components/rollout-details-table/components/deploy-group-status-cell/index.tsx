import { TotalTargetCountStatus } from '@/entities/rollout';
import Tooltip from '@/app/components/tooltip';
import styles from './styles.module.scss';
import { getTotalTargetStatusIcon, getTotalTargetStatusLabel } from '@/app/x/rollout/utils/utils';

interface DeployGroupStatusProps {
  status: TotalTargetCountStatus;
}

export function DeployGroupStatusCell({ status }: DeployGroupStatusProps) {
  const statusIcon = getTotalTargetStatusIcon(status);
  const statusLabel = getTotalTargetStatusLabel(status);

  return (
    <div className={`${styles.container} ${styles[status.toLowerCase()]}`}>
      <Tooltip content={statusLabel}>{statusIcon}</Tooltip>
    </div>
  );
}

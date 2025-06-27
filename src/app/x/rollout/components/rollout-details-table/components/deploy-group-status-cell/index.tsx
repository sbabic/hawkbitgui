import { RolloutStatus } from '@/entities/rollout';
import Tooltip from '@/app/components/tooltip';
import styles from './styles.module.scss';
import { getRolloutStatusIcon, getRolloutStatusLabel } from '@/app/x/rollout/utils/utils';

interface DeployGroupStatusProps {
  status: RolloutStatus;
}

export function DeployGroupStatusCell({ status }: DeployGroupStatusProps) {
  const statusIcon = getRolloutStatusIcon(status);
  const statusLabel = getRolloutStatusLabel(status);

  return (
    <div className={`${styles.container} ${styles[status.toLowerCase()]}`}>
      <Tooltip content={statusLabel}>{statusIcon}</Tooltip>
    </div>
  );
}

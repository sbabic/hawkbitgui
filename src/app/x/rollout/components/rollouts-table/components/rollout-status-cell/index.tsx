import { RolloutStatus } from '@/entities/rollout';
import styles from './styles.module.scss';
import Tooltip from '@/app/components/tooltip';
import { getRolloutStatusIcon, getRolloutStatusLabel } from '@/app/x/rollout/utils/utils';
interface RolloutStatusProps {
  status: RolloutStatus;
}

export function RolloutStatusCell({ status }: RolloutStatusProps) {
  const statusIcon = getRolloutStatusIcon(status);
  const statusLabel = getRolloutStatusLabel(status);

  return (
    <div className={`${styles.container} ${styles[status.toLowerCase()]}`}>
      <Tooltip content={statusLabel}>{statusIcon}</Tooltip>
    </div>
  );
}

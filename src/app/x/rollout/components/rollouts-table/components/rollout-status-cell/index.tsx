import CircleCheckMarkIcon from '@/app/components/icons/circle-check-mark-icon';
import CircleDotIcon from '@/app/components/icons/circle-dot-icon';
import { RolloutStatus } from '@/entities/rollout';
import styles from './styles.module.scss';
import CircleErrorIcon from '@/app/components/icons/circle-error-icon';
interface RolloutStatusProps {
  status: RolloutStatus;
}

export function RolloutStatusCell({ status }: RolloutStatusProps) {
  const statusMapper: Record<RolloutStatus, React.ReactElement | null> = {
    creating: <div></div>,
    waiting_for_approval: <div></div>,
    approval_denied: <CircleErrorIcon />,
    ready: <CircleDotIcon />,
    paused: <div></div>,
    starting: <div></div>,
    stopped: <div></div>,
    stopping: <div></div>,
    running: <CircleDotIcon />,
    finished: <CircleCheckMarkIcon />,
    deleting: <div></div>,
    deleted: <div></div>,
  };

  return <div className={`${styles.container} ${styles[status.toLowerCase()]}`}>{statusMapper[status]}</div>;
}

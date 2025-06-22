import CircleCheckMarkIcon from '@/app/components/icons/circle-check-mark-icon';
import CircleDotIcon from '@/app/components/icons/circle-dot-icon';
import CircleErrorIcon from '@/app/components/icons/circle-error-icon';
import PauseIcon from '@/app/components/icons/pause-icon';
import { RolloutStatus } from '@/entities/rollout';

export const getRolloutStatusIcon = (status: RolloutStatus): React.ReactElement | null => {
  const statusMapper: Record<RolloutStatus, React.ReactElement | null> = {
    creating: <div></div>,
    waiting_for_approval: <div></div>,
    approval_denied: <CircleErrorIcon />,
    ready: <CircleDotIcon />,
    paused: <PauseIcon />,
    starting: <div></div>,
    stopped: <div></div>,
    stopping: <div></div>,
    running: <CircleDotIcon />,
    finished: <CircleCheckMarkIcon />,
    deleting: <div></div>,
    deleted: <div></div>,
  };

  return statusMapper[status];
};

export const getRolloutStatusLabel = (status: RolloutStatus): string => {
  const statusMapper: Record<RolloutStatus, string> = {
    creating: 'Creating',
    waiting_for_approval: 'Waiting for approval',
    approval_denied: 'Approval denied',
    ready: 'Ready',
    paused: 'Paused',
    starting: 'Starting',
    stopped: 'Stopped',
    stopping: 'Stopping',
    running: 'Running',
    finished: 'Finished',
    deleting: 'Deleting',
    deleted: 'Deleted',
  };
  return statusMapper[status];
};

import BlockIcon from '@/app/components/icons/block-icon';
import CircleCheckMarkIcon from '@/app/components/icons/circle-check-mark-icon';
import CircleDotIcon from '@/app/components/icons/circle-dot-icon';
import CircleErrorIcon from '@/app/components/icons/circle-error-icon';
import ClockIcon from '@/app/components/icons/clock-icon';
import NotStartedIcon from '@/app/components/icons/not-started-icon';
import PauseIcon from '@/app/components/icons/pause-icon';
import SpinnerIcon from '@/app/components/icons/spinner-icon';
import { RolloutStatus, TotalTargetCountStatus } from '@/entities/rollout';

export const getRolloutStatusIcon = (status: RolloutStatus): React.ReactElement | null => {
  const statusMapper: Record<RolloutStatus, React.ReactElement | null> = {
    creating: <SpinnerIcon />,
    waiting_for_approval: <ClockIcon />,
    approval_denied: <CircleErrorIcon />,
    ready: <CircleDotIcon />,
    paused: <PauseIcon />,
    starting: <SpinnerIcon />,
    stopped: <BlockIcon />,
    stopping: <SpinnerIcon />,
    running: <CircleDotIcon />,
    finished: <CircleCheckMarkIcon />,
    deleting: <SpinnerIcon />,
    deleted: <BlockIcon />,
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

export const getTotalTargetStatusIcon = (status: TotalTargetCountStatus): React.ReactElement | null => {
  const statusIconMapper: Record<TotalTargetCountStatus, React.ReactElement | null> = {
    running: <CircleDotIcon />,
    notstarted: <NotStartedIcon />,
    scheduled: <ClockIcon />,
    cancelled: <BlockIcon />,
    finished: <CircleCheckMarkIcon />,
    error: <CircleErrorIcon />,
  };

  return statusIconMapper[status];
};

export const getTotalTargetStatusLabel = (status: TotalTargetCountStatus): string => {
  const statusTextMapper: Record<TotalTargetCountStatus, string> = {
    running: 'Running',
    notstarted: 'Not Started',
    scheduled: 'Scheduled',
    cancelled: 'Cancelled',
    finished: 'Finished',
    error: 'Error',
  };

  return statusTextMapper[status];
};

import ChevronDownIcon from '@/app/components/icons/chevron-down-icon';
import styles from './styles.module.scss';

interface RolloutsDetailsCardHeaderProps {
  rolloutName: string;
  deployGroupName: string;
  onRolloutsClick: () => void;
  onDeployGroupNameClick: () => void;
}

export function RolloutsDeployGroupTargetDetailsCardHeader({
  rolloutName,
  deployGroupName,
  onRolloutsClick,
  onDeployGroupNameClick,
}: RolloutsDetailsCardHeaderProps) {
  return (
    <div className={styles.container}>
      <p style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={onRolloutsClick}>
        Rollouts
      </p>
      <ChevronDownIcon width={30} height={30} style={{ transform: 'rotate(270deg)' }} />
      <p style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={onDeployGroupNameClick}>
        {rolloutName}
      </p>
      <ChevronDownIcon width={30} height={30} style={{ transform: 'rotate(270deg)' }} />
      <p style={{ fontWeight: 'bold' }}>{deployGroupName}</p>
    </div>
  );
}

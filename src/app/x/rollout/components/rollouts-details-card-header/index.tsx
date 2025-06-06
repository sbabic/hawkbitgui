import ChevronDownIcon from '@/app/components/icons/chevron-down-icon';
import styles from './styles.module.scss';

interface RolloutsDetailsCardHeaderProps {
  rolloutName: string;
  onBackClick: () => void;
}

export function RolloutsDetailsCardHeader({ rolloutName, onBackClick }: RolloutsDetailsCardHeaderProps) {
  return (
    <div className={styles.container}>
      <p style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={onBackClick}>
        Rollouts
      </p>
      <ChevronDownIcon width={30} height={30} style={{ transform: 'rotate(270deg)' }} />
      <p style={{ fontWeight: 'bold' }}>{rolloutName}</p>
    </div>
  );
}

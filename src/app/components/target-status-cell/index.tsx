import styles from './styles.module.scss';

export default function TargetStatusCell({ status }: { status: string }) {
  return (
    <div className={styles.statusCell}>
      <div className={styles.status}>
        <span className={`${styles.statusIndicator} ${status.toLowerCase()}`} />
        {status}
      </div>
    </div>
  );
}

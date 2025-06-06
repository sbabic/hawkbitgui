import styles from './styles.module.scss';

interface DraggedItemPreviewProps {
  name?: string;
  count?: number;
}

export default function DraggedItemPreview({ name, count }: DraggedItemPreviewProps) {
  return (
    <div className={styles.container}>
      {name}
      {count ? <div className={styles.counter}>{count}</div> : null}
    </div>
  );
}

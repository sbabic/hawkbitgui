import styles from './styles.module.scss';

interface DraggedItemPreviewProps {
  name?: string;
}

export default function DraggedItemPreview({ name }: DraggedItemPreviewProps) {
  return <div className={styles.container}>{name}</div>;
}

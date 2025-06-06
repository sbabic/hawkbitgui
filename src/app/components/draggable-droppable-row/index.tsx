import { useDraggable, useDroppable } from '@dnd-kit/core';
import { MouseEventHandler, ReactNode } from 'react';
import styles from './styles.module.scss';

type Props<T, Y> = {
  id: string | number;
  children: ReactNode;
  className?: string;
  draggable?: boolean;
  droppable?: boolean;
  isSelected?: boolean;
  dragData?: T;
  dropData?: Y;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function DraggableDroppableRow<T, Y>({
  id,
  children,
  className,
  draggable = false,
  droppable = false,
  isSelected = false,
  dragData,
  dropData,
  onClick,
}: Props<T, Y>) {
  const {
    setNodeRef: setDragRef,
    attributes,
    listeners,
  } = useDraggable({
    id,
    disabled: !draggable,
    data: {
      dragData,
    },
  });

  const drop = useDroppable({
    id,
    disabled: !droppable,
    data: {
      dropData: dropData,
    },
  });

  const { setNodeRef: setDropRef, isOver } = drop;

  const ref = (el: HTMLElement | null) => {
    if (droppable) setDropRef(el);
    if (draggable) setDragRef(el);
  };

  return (
    <div
      ref={ref}
      {...(draggable ? attributes : {})}
      {...(draggable ? listeners : {})}
      className={`${styles.container} ${className}`}
      style={{
        backgroundColor: droppable && isOver ? '#e0ffe0' : undefined,
        cursor: draggable ? 'grab' : 'default',
      }}
      onClick={onClick}
    >
      {children}
      {isSelected && <div className={styles.selectMarker}></div>}
    </div>
  );
}

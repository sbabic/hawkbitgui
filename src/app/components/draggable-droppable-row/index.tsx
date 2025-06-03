import { useDraggable, useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

type Props<T> = {
  id: string | number;
  children: ReactNode;
  className?: string;
  draggable?: boolean;
  droppable?: boolean;
  dragData?: T;
  dropData?: T;
};

export default function DraggableDroppableRow<T>({ id, children, className, draggable = false, droppable = false, dragData, dropData }: Props<T>) {
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
      className={className}
      style={{
        backgroundColor: droppable && isOver ? '#e0ffe0' : undefined,
        cursor: draggable ? 'grab' : 'default',
      }}
    >
      {children}
    </div>
  );
}

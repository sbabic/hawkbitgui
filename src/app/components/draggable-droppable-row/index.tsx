import { useDraggable, useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

export default function DraggableDroppableRow({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  const {
    setNodeRef: setDragRef,
    attributes,
    listeners,
  } = useDraggable({
    id,
  });
  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id,
  });

  const ref = (el: HTMLElement | null) => {
    setDragRef(el);
    setDropRef(el);
  };

  return (
    <div
      ref={ref}
      {...attributes}
      {...listeners}
      className={className}
      style={{
        backgroundColor: isOver ? '#e0ffe0' : undefined,
        cursor: 'grab',
      }}
    >
      {children}
    </div>
  );
}

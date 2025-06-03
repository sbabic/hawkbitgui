'use client';

import styles from './styles.module.scss';
import { PageWrapper } from '@/app/components/page-wrapper';
import TargetsCardContainer from '@/app/x/deployment/containers/targets-card-container';
import DistributionsCardContainer from '@/app/x/deployment/containers/distributions-card-container';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';

export default function Deployment() {
  const [isDragging, setIsDragging] = useState(false);
  function handleDragStart(event: DragStartEvent) {
    console.log('drag start');
    console.log(event.active.data.current);
    setIsDragging(true);
  }

  function handleDragEnd(event: DragEndEvent) {
    console.log('drag end');
    console.log(event.over?.data.current);
    setIsDragging(false);
  }
  return (
    <>
      <PageWrapper>
        <PageWrapper.Title>Deployment Management</PageWrapper.Title>
        <div className={`${styles.cardsContainer}`}>
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <TargetsCardContainer />
            <DistributionsCardContainer />
            <DragOverlay>{isDragging ? <div style={{ height: 100, width: 100 }}>GHp;as</div> : null}</DragOverlay>
            {/*{createPortal(<DragOverlay>{isDragging ? <div style={{ height: 100, width: 100 }}>GHp;as</div> : null}</DragOverlay>, document.body)}*/}
          </DndContext>
        </div>
      </PageWrapper>
    </>
  );
}

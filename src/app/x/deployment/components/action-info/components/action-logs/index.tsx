'use client';

import styles from './styles.module.scss';
import { ActionLog } from '@/entities/action-log';
import { Collapsible } from '@/app/components/collapsible';
import dayjs from 'dayjs';
import { Chip } from '@/app/components/chip';
import Skeleton from 'react-loading-skeleton';
import React from 'react';
import Text from '@/app/components/text';

export interface ActionLogsProps {
  logs: ActionLog[];
  isLoading?: boolean;
}

export default function ActionLogs({ logs, isLoading }: ActionLogsProps) {
  return (
    <div className={styles.container}>
      <Text variant='heading-2'>Logs</Text>
      <div className={styles.logsContainer}>
        {!isLoading ? (
          logs.map((log) => (
            <Collapsible key={log.id} defaultOpen={true}>
              <Collapsible.Trigger>
                <div className={styles.collapsableItem}>
                  <Chip value={log.type} colorClassName={log.type} />
                  <p>{dayjs(log.reportedAt).toISOString()}</p>
                </div>
              </Collapsible.Trigger>
              <Collapsible.Content>
                <div className={styles.logMessageContainers}>
                  {log.messages.map((message, index) => (
                    <div key={index} className={styles.logMessage}>
                      <b>{index + 1}:</b> {message}
                    </div>
                  ))}
                </div>
              </Collapsible.Content>
            </Collapsible>
          ))
        ) : (
          <Skeleton width={'100%'} height={67} count={7} />
        )}
      </div>
    </div>
  );
}

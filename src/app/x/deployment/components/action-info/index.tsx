'use client';
import CardWithSidebar from '@/app/components/card-with-sidebar';
import ActionLogsContainer from '@/app/x/deployment/components/action-info/containers/action-logs-container';

export default function ActionInfo() {
  return <CardWithSidebar content={[{ title: 'Logs', component: <ActionLogsContainer /> }]} />;
}

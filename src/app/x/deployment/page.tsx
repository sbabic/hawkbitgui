import { PageWrapper } from '@/app/components/page-wrapper';
import DeploymentDndLayoutContainer from '@/app/x/deployment/containers/deployment-dnd-layout-container';

export default function Deployment() {
  return (
    <>
      <PageWrapper>
        <PageWrapper.Title>Deployment Management</PageWrapper.Title>
        <DeploymentDndLayoutContainer />
      </PageWrapper>
    </>
  );
}

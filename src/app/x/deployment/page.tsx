import styles from './styles.module.scss';
import { PageWrapper } from '@/app/components/page-wrapper';
import TargetsCardContainer from '@/app/x/deployment/containers/targets-card-container';
import DistributionsCardContainer from '@/app/x/deployment/containers/distributions-card-container';

export default function Deployment() {
    return (
        <PageWrapper>
            <PageWrapper.Title>Deployment Management</PageWrapper.Title>
            <div className={`${styles.cardsContainer}`}>
                <TargetsCardContainer />
                <DistributionsCardContainer />
            </div>
        </PageWrapper>
    );
}

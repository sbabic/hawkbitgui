import styles from './styles.module.scss';
import Card from '@/app/components/card';
import { PageWrapper } from '@/app/components/page-wrapper';
import TargetsCardContainer from '@/app/x/deployment/containers/targets-card-container';

export default function Deployment() {
    return (
        <PageWrapper>
            <PageWrapper.Title>Deployment Management</PageWrapper.Title>
            <div className={`${styles.cardsContainer}`}>
                <TargetsCardContainer />
                <Card>
                    <h1>Distributions</h1>
                </Card>
            </div>
        </PageWrapper>
    );
}

import styles from './styles.module.scss';
import Card from '@/app/components/card';
import TargetsCardContainer from '@/app/x/deployment/containers/targets-card-container';

export default function Deployment() {
    console.log('Deployment page loaded');
    return (
        <div className={`${styles.page}`}>
            <h1>Deployment Management</h1>
            <div className={`${styles.cardsContainer}`}>
                <TargetsCardContainer />
                <Card>
                    <h1>Distributions</h1>
                </Card>
            </div>
        </div>
    );
}

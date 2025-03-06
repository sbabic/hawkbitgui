import styles from './styles.module.scss';
import Card from '@/app/components/card';
import TargetsCard from '@/app/x/deployment/components/targets-card';

export default function Deployment() {
    return (
        <div className={`${styles.page}`}>
            <h1>Deployment Management</h1>
            <div className={`${styles.cardsContainer}`}>
                <TargetsCard />
                <Card>
                    <h1>Distributions</h1>
                </Card>
            </div>
        </div>
    );
}

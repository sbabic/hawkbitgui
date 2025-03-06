import styles from './styles.module.scss';
import Card from '@/app/components/card';

export default function Deployment() {
    return (
        <div className={`${styles.page}`}>
            <h1>Deployment Management</h1>
            <div className={`${styles.cardsContainer}`}>
                <Card>
                    <h1>Targets</h1>
                </Card>
                <Card>
                    <h1>Distributions</h1>
                </Card>
            </div>
        </div>
    );
}

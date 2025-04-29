import Button from '../button';
import styles from './styles.module.scss';

type ActionButtonsProps = {
    children: React.ReactNode;
};

type PrimaryButtonProps = ActionButtonsProps & {
    type?: HTMLButtonElement['type'];
    onClick?: () => void;
};

type SecondaryButtonProps = ActionButtonsProps & {
    onClick: () => void;
};

function PrimaryButton({ type = 'button', children, onClick }: PrimaryButtonProps) {
    return (
        <Button type={type} onClick={onClick}>
            {children}
        </Button>
    );
}

function SecondaryButton({ children, onClick }: SecondaryButtonProps) {
    return (
        <Button variant='outline' onClick={onClick}>
            {children}
        </Button>
    );
}

export function ActionButtons({ children }: ActionButtonsProps) {
    return <div className={styles.actionButtons}>{children}</div>;
}

ActionButtons.Primary = PrimaryButton;
ActionButtons.Secondary = SecondaryButton;

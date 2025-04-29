import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
    description?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, hasError = false, description, id, ...props }, ref) => {
    return (
        <label className={styles.container}>
            <input type='checkbox' ref={ref} id={id} className={`${styles.checkbox} ${className || ''} ${hasError ? styles.error : ''}`} {...props} />
            {description && <p className={styles.description}>{description}</p>}
        </label>
    );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;

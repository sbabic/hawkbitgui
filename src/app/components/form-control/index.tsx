import styles from './styles.module.scss';

interface FormControlProps {
  id: string;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
}

export default function FormControl({ id, label, required = false, errorMessage, children }: FormControlProps) {
  return (
    <div className={styles.formGroup}>
      {label && (
        <label htmlFor={id}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {children}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}

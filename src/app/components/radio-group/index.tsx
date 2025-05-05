import Radio from '../radio';
import styles from './styles.module.scss';
interface RadioGroupProps {
    value: string;
    options: {
        id: string;
        label: string;
        icon?: React.ReactNode;
    }[];
    onChange: (value: string) => void;
}
export default function RadioGroup({ value, options, onChange }: RadioGroupProps) {
    return (
        <div className={styles.radioGroup}>
            {options.map((option) => (
                <Radio key={option.id} id={option.id} label={option.label} checked={value === option.id} onChange={onChange} icon={option.icon} />
            ))}
        </div>
    );
}

import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    errors?: string[];
}

export default function Input({ label, errors = [], className, ...props }: InputProps) {
    return (
        <div className={styles.container}>
            <label htmlFor={props.id} className={styles.label}>
                {label}
            </label>
            <input
                {...props}
                className={`${styles.input} ${errors.length > 0 ? styles.inputError : ""} ${className || ""}`}
            />
            {errors.map((error, index) => (
                <p key={index} className={styles.errorMessage}>
                    {error}
                </p>
            ))}
        </div>
    );
}
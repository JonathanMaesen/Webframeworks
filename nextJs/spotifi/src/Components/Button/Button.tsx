import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "outline" | "icon";
    size?: "small" | "medium" | "large";
    fullWidth?: boolean;
    isLoading?: boolean;
}

export default function Button({ 
    children, 
    variant = "primary", 
    size = "medium",
    fullWidth = false,
    isLoading = false, 
    className, 
    disabled,
    ...props 
}: ButtonProps) {
    const variantClass = styles[variant];
    const sizeClass = size !== "medium" ? styles[size] : "";
    const widthClass = fullWidth ? styles.fullWidth : "";

    return (
        <button
            className={`${styles.button} ${variantClass} ${sizeClass} ${widthClass} ${className || ""}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? "Loading..." : children}
        </button>
    );
}
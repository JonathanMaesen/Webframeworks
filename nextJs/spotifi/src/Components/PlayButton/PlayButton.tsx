"use client";

import Button from "@/Components/Button/Button";
import styles from "./PlayButton.module.css";

interface PlayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function PlayButton(props: PlayButtonProps) {
    return (
        <Button variant="icon" aria-label="Play" {...props}>
            <div className={styles.playIcon} />
        </Button>
    );
}
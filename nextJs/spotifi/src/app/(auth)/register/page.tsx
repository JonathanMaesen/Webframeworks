"use client";

import { useActionState } from "react";
import { register } from "@/database/auth/authActions";
import styles from "./page.module.css";
import Link from "next/link";
import Input from "@/Components/Input/Input";
import Button from "@/Components/Button/Button";

export default function Register() {
    const [state, registerAction, pending] = useActionState(register, {
        success: false,
        email: "",
        name: "",
        errors: { email: [], password: [], name: [], general: [] },
    });

    return (
        <div className={styles.container}>
            <div className={styles.card}>

                <h1 className={styles.title}>Register</h1>
                <p className={styles.subtitle}>
                    Create an account to start listening
                </p>

                {state.errors.general.length > 0 && (
                    <div className={styles.errorBox}>
                        {state.errors.general.join(", ")}
                    </div>
                )}

                <form action={registerAction} className={styles.form}>
                    <Input
                        label="Name"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        defaultValue={state.name}
                        errors={state.errors.name}
                    />

                    <Input
                        label="Email"
                        id="email"
                        name="email"
                        type="text"
                        placeholder="m@example.com"
                        defaultValue={state.email}
                        errors={state.errors.email}
                    />

                    <Input
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        errors={state.errors.password}
                    />

                    <Button type="submit" isLoading={pending} fullWidth size="small">
                        Sign Up
                    </Button>
                </form>

                <p className={styles.linkText}>
                    Already have an account?{" "}
                    <Link href="/login" className={styles.link}>
                        Log in
                    </Link>
                </p>
                <p className={styles.linkText}>
                    <Link href="/home" className={styles.link}>
                        Continue as Guest
                    </Link>
                </p>
            </div>
        </div>
    );
};
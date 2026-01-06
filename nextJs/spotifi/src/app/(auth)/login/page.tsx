"use client";

import { useActionState } from "react";
import { login } from "@/database/auth/authActions";
import styles from "./page.module.css";
import Link from "next/link";
import Input from "@/Components/Input/Input";
import Button from "@/Components/Button/Button";

export default function Login() {
    const [state, loginAction, pending] = useActionState(login, {
        success: false,
        email: "",
        errors: { email: [], password: [], general: [] },
    });

    return (
        <div className={styles.container}>
            <div className={styles.card}>

                <h1 className={styles.title}>Login</h1>
                <p className={styles.subtitle}>
                    Enter your email below to login to your account
                </p>

                {state.errors.general.length > 0 && (
                    <div className={styles.errorBox}>
                        {state.errors.general.join(", ")}
                    </div>
                )}

                <form action={loginAction} className={styles.form}>
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
                        placeholder="Your password"
                        errors={state.errors.password}
                    />

                    <Button type="submit" isLoading={pending} fullWidth size="small">
                        Login
                    </Button>
                </form>

                <p className={styles.linkText}>
                    Don't have an account?{" "}
                    <Link href="/register" className={styles.link}>
                        Sign up
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
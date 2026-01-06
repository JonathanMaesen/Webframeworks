"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: 'var(--background-base)',
            color: 'var(--text-base)',
            textAlign: 'center'
        }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Something went wrong!</h2>
            <button
                onClick={() => reset()}
                style={{
                    backgroundColor: 'var(--essential-base)',
                    color: 'black',
                    padding: '0.75rem 2rem',
                    borderRadius: '2rem',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}
            >
                Try again
            </button>
        </div>
    );
}
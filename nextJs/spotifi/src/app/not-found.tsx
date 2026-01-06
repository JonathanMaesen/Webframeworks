import Link from "next/link";

export default function NotFound() {
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
            <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem' }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Page Not Found</h2>
            <p style={{ color: 'var(--text-subdued)', marginBottom: '2rem' }}>
                We can't seem to find the page you are looking for.
            </p>
            <Link 
                href="/home" 
                style={{
                    backgroundColor: 'var(--essential-base)',
                    color: 'black',
                    padding: '0.75rem 2rem',
                    borderRadius: '2rem',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                }}
            >
                Home
            </Link>
        </div>
    );
}
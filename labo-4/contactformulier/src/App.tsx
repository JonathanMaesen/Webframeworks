import './App.css';
import { useState, type ChangeEvent } from 'react';

interface Form {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    status: string;
}

export default function App() {
    const [form, setForm] = useState<Form>({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        status: '',
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.currentTarget;
        setForm(prev => ({ ...prev, [name]: value } as Form));
    };

    return (
        <>
            <form>
                <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

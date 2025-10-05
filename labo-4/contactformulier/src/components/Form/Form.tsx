import { ChangeEvent, useState } from "react";
import styles from "./Form.module.css";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    status: string;
}

export function Form() {
    const [form, setForm] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        status: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.currentTarget;
        setForm(prev => ({ ...prev, [name]: value } as FormData));
    };

    function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
        formEvent.preventDefault();
        setIsSubmitted(true);
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                />

                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />

                <label>Message</label>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                />

                <button type="submit">Submit</button>
            </form>

            {isSubmitted && (
                <div>
                    <p>
                        Thanks {form.firstName} {form.lastName}, we’ll contact you at{" "}
                        {form.email}.
                    </p>
                </div>
            )}
        </>
    );
}

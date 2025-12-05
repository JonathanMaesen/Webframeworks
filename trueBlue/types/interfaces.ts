import {Href} from "expo-router";

export interface AuthFormProps {
    title: string;
    buttonText: string;
    onSubmit: (email: string, password: string) => Promise<void>;
    footerText: string;
    footerLinkText: string;
    footerLink: Href;
}
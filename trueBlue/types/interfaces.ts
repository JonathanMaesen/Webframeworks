import {Href} from "expo-router";
import { Theme } from "./types";

export interface AuthFormProps {
    title: string;
    buttonText: string;
    onSubmit: (email: string, password: string) => Promise<void>;
    footerText: string;
    footerLinkText: string;
    footerLink: Href;
}
export interface HighlightedIngredientsProps {
    text: string;
}

export interface NutriScoreProps {
    score: string | undefined;
    theme: Theme;
}
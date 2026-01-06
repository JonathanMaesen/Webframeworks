import {SortField} from "@/database/types";
import {SortDirection} from "mongodb";

export interface NavLinkProps {
    href: string;
    label: string;
}
export interface HomeProps {
    searchParams: Promise<{
        q?: string;
        sort?: SortField;
        dir?: SortDirection;
        page?: string;
    }>;
}
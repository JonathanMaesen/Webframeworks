// file: types.ts
export interface User {
    id: number;
    email: string;
    name: string;
    credits: number;
    avatar: string;
    passwordHash: string;
    library: number[];
}


export interface Song {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    credits: number;
    mp3: string;
    owned?: boolean;
    more_information: {
        publish_date: string;
        genre: string;
        type: string;
        youtube?: string;
    };
}


export type SortField = "title" | "owned" | "publish_date";
export type SortDirection = "asc" | "desc";
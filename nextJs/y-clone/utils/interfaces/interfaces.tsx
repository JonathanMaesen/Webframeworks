export interface Post {
    _id?: string;
    name: string;
    username: string;
    text: string;
    createdOn: string;
    profile?: Profile;
    likes?: number;
}
export interface Profile {
    _id?: string;
    username: string;
    name: string;
    bio: string;
    avatarUrl: string;
    bannerUrl: string;
    password: string;
}
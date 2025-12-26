export interface Post {
    name: string;
    username: string;
    text: string;
    createdOn: string;
    profile?: Profile;
}
export interface Profile {
    username: string;
    name: string;
    bio: string;
    avatarUrl: string;
    bannerUrl: string;
    password: string;
}
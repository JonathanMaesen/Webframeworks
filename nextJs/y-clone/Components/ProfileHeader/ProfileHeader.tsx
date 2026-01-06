import { Profile } from "@/utils/interfaces/interfaces";

export default function ProfileHeader({ profile }: { profile: Profile }) {
    return (
        <div>
            <div className="relative">
                <div className="h-32 bg-gray-200 overflow-hidden">
                    {profile.bannerUrl && (
                        <img 
                            src={profile.bannerUrl} 
                            alt="Banner" 
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
                <div className="absolute -bottom-12 left-4">
                    <img
                        src={profile.avatarUrl}
                        alt={profile.name}
                        className="w-24 h-24 rounded-full border-4 border-white object-cover"
                    />
                </div>
            </div>
            
            <div className="mt-14 px-4">
                <h1 className="text-xl font-bold">{profile.name}</h1>
                <p className="text-gray-500">@{profile.username}</p>
                <p className="mt-2">{profile.bio}</p>
            </div>
        </div>
    );
}
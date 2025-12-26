import { seedDatabase } from "@/utils/db";

export default async function SeedPage() {
  const { posts, profiles } = await seedDatabase();

  return (
    <div>
      Seeded {posts.length} posts and {profiles.length} profiles.
    </div>
  );
}

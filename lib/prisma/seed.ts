import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = Array.from({ length: 20 }).map((_, i) => ({
    email: `user${i + 1}@example.com`,
    full_name: `Demo User ${i + 1}`,
    bio: `Hello! I'm demo user number ${i + 1}.`,
    avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=User${i + 1}`,
    phone: `+100000000${i + 1}`,

    address_line: `${100 + i} Demo Street`,
    city: "Test City",
    state: "Test State",
    country: "Test Country",
    postal_code: `100${i}`,

    is_active: true,
    role: i === 0 ? UserRole.ADMIN : UserRole.USER, // first user is admin
  }));

  await prisma.user.createMany({
    data: users,
  });

  console.log("✅ Seeded 20 users successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { prisma, Prisma } from "@/lib/prisma/client";

interface FindAllUsersOptions {
  page?: number;
  limit?: number;
  search?: string;
  role?: "USER" | "ADMIN";
  isActive?: boolean;
  sortBy?: "created_at" | "updated_at" | "email" | "full_name";
  sortOrder?: "asc" | "desc";
  city?: string;
  country?: string;
}

export async function findAllUsers(options: FindAllUsersOptions = {}) {
  const {
    page = 1,
    limit = 10,
    search = "",
    role,
    isActive,
    sortBy = "created_at",
    sortOrder = "desc",
    city,
    country,
  } = options;

  // Calculate skip value for pagination
  const skip = (page - 1) * limit;

  // Build where clause
  const where: Prisma.UserWhereInput = {
    AND: [
      // Search across multiple fields
      search
        ? {
            OR: [
              { email: { contains: search } },
              { full_name: { contains: search } },
              { phone: { contains: search } },
              { bio: { contains: search } },
            ],
          }
        : {},
      // Filter by role
      role ? { role } : {},
      // Filter by active status
      isActive !== undefined ? { is_active: isActive } : {},
      // Filter by location
      city ? { city: { contains: city } } : {},
      country ? { country: { contains: country } } : {},
    ],
  };

  // Execute queries in parallel
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      select: {
        id: true,
        email: true,
        full_name: true,
        bio: true,
        avatar_url: true,
        phone: true,
        address_line: true,
        city: true,
        state: true,
        country: true,
        postal_code: true,
        is_active: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  // Calculate pagination metadata
  const totalPages = Math.ceil(total / limit);

  return {
    data: users,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}

export async function findUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
  });
}

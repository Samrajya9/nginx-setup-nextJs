import UserCard from "@/components/user-card";
import UserPageLayout from "@/components/user-page-layout";
import { findAllUsers } from "@/services/users.services";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = parseInt(pageParam || "1", 10);

  const users = await findAllUsers({ page: currentPage, limit: 5 });
  const { data, meta } = users;

  return (
    <UserPageLayout
      title="Server-Fetched Users"
      description="Data fetched directly from the database on the server."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-20 bg-zinc-100/50 dark:bg-zinc-900/50 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700">
          <p className="text-zinc-500 dark:text-zinc-400">No users found.</p>
        </div>
      )}

      {/* Pagination Controls */}
      {meta.totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-4">
          <Link
            href={`/server-fetched?page=${currentPage - 1}`}
            className={`px-6 py-3 rounded-2xl font-bold transition-all ${
              !meta.hasPrevPage
                ? "bg-zinc-100 text-zinc-400 pointer-events-none dark:bg-zinc-800 dark:text-zinc-600"
                : "bg-white text-zinc-900 shadow-md hover:shadow-lg hover:-translate-y-0.5 dark:bg-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800"
            }`}
          >
            ← Previous
          </Link>

          <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-sm font-bold">
            <span className="text-blue-600 dark:text-blue-400">
              {currentPage}
            </span>
            <span className="text-zinc-400">/</span>
            <span className="text-zinc-600 dark:text-zinc-400">
              {meta.totalPages}
            </span>
          </div>

          <Link
            href={`/server-fetched?page=${currentPage + 1}`}
            className={`px-6 py-3 rounded-2xl font-bold transition-all ${
              !meta.hasNextPage
                ? "bg-zinc-100 text-zinc-400 pointer-events-none dark:bg-zinc-800 dark:text-zinc-600"
                : "bg-white text-zinc-900 shadow-md hover:shadow-lg hover:-translate-y-0.5 dark:bg-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800"
            }`}
          >
            Next →
          </Link>
        </div>
      )}
    </UserPageLayout>
  );
}

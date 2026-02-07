import { User } from "@/lib/prisma/client";
import Link from "next/link";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link
      href={`/server-fetched/${user.id}`}
      className="group relative block bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 hover:-translate-y-1 active:scale-[0.98]"
    >
      <div className="flex items-start gap-5">
        {/* Avatar Placeholder */}
        <div className="shrink-0 w-16 h-16 rounded-2xl bg-linear-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center text-zinc-400 border border-zinc-200 dark:border-zinc-700 overflow-hidden">
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.full_name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <span className="text-2xl font-bold">
              {user.full_name.charAt(0)}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {user.full_name}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 italic">
            {user.bio || "No bio available"}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
        <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
          <span className="shrink-0 w-5 text-zinc-400 font-mono">@</span>
          <span className="truncate ml-2">{user.email}</span>
        </div>
        {user.phone && (
          <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
            <span className="shrink-0 w-5 text-zinc-400 font-mono">#</span>
            <span className="truncate ml-2">{user.phone}</span>
          </div>
        )}
        {(user.city || user.country) && (
          <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
            <span className="shrink-0 w-5 text-zinc-400 font-mono">Lo</span>
            <span className="truncate ml-2">
              {[user.city, user.country].filter(Boolean).join(", ")}
            </span>
          </div>
        )}
      </div>

      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider ${
            user.is_active
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-500"
          }`}
        >
          {user.is_active ? "Active" : "Inactive"}
        </span>
      </div>
    </Link>
  );
};

export default UserCard;

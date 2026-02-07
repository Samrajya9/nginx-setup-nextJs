import { findUserById } from "@/services/users.services";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const user = await findUserById(parseInt(id));

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans p-8 sm:p-20">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/server-fetched"
          className="group flex items-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-8"
        >
          <span className="mr-2 text-2xl group-hover:-translate-x-1 transition-transform">
            ←
          </span>{" "}
          Back to User List
        </Link>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-xl shadow-zinc-200/50 dark:shadow-zinc-950/50">
          {/* Header/Cover Area */}
          <div className="h-48 bg-linear-to-br from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-950 relative">
            <div className="absolute -bottom-16 left-12">
              <div className="w-32 h-32 rounded-3xl bg-white dark:bg-zinc-800 p-1.5 shadow-2xl">
                <div className="w-full h-full rounded-[1.25rem] bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-zinc-400 border border-zinc-200 dark:border-zinc-600 overflow-hidden">
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={user.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold">
                      {user.full_name.charAt(0)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-20 pb-12 px-12">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                  {user.full_name}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-lg font-medium">
                  {user.role} • {user.is_active ? "Active Now" : "Inactive"}
                </p>
              </div>
              <div
                className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-widest ${
                  user.is_active
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20"
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-700"
                }`}
              >
                {user.is_active ? "Active" : "Inactive"}
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-10">
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-4">
                    Biography
                  </h3>
                  <p className="text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed">
                    {user.bio || "No biography provided for this user."}
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-3">
                      Email Address
                    </h3>
                    <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                      {user.email}
                    </p>
                  </section>
                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-3">
                      Phone Number
                    </h3>
                    <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                      {user.phone || "Not provided"}
                    </p>
                  </section>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-6">
                    Location Detail
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex flex-col">
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase font-bold tracking-widest">
                        City
                      </span>
                      <span className="text-zinc-900 dark:text-zinc-100 font-semibold text-sm">
                        {user.city || "—"}
                      </span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase font-bold tracking-widest">
                        Country
                      </span>
                      <span className="text-zinc-900 dark:text-zinc-100 font-semibold text-sm">
                        {user.country || "—"}
                      </span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase font-bold tracking-widest">
                        State/Region
                      </span>
                      <span className="text-zinc-900 dark:text-zinc-100 font-semibold text-sm">
                        {user.state || "—"}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="text-[10px] text-zinc-400 dark:text-zinc-600 italic px-4">
                  Member since{" "}
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-12">
          Experience the Power of Next.js
        </h1>

        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <Link
            href="/server-fetched"
            className="group relative flex-1 inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-zinc-900 rounded-2xl hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            <span className="relative">Server Fetched</span>
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-all duration-300" />
          </Link>

          <Link
            href="/client-fetched"
            className="group relative flex-1 inline-flex items-center justify-center px-8 py-4 font-semibold text-zinc-900 transition-all duration-300 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
          >
            <span className="relative">Client Fetched</span>
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 group-hover:ring-black/10 transition-all duration-300" />
          </Link>
        </div>
      </main>
    </div>
  );
}

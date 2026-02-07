import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function UserPageLayout({
  children,
  title,
  description,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans p-8 sm:p-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <Link
              href="/"
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-4 inline-block"
            >
              <span className="mr-2 text-4xl">←</span> Back to Home
            </Link>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {title}
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

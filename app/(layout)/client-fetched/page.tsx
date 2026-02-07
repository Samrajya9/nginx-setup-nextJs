"use client";

import UserPageLayout from "@/components/user-page-layout";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const ClientUserList = dynamic(() => import("./components/client-user-list"), {
  ssr: false,
});

export default function Page() {
  return (
    <UserPageLayout
      title="Client-Fetched Users"
      description="Data fetched from the browser's fetch API."
    >
      <Suspense
        fallback={
          <p className="text-center text-zinc-500 dark:text-zinc-400">
            Loading users...
          </p>
        }
      >
        <ClientUserList />
      </Suspense>
    </UserPageLayout>
  );
}

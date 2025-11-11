"use client";
import { useAppSelector } from "@/lib/redux/hooks/hooks";

export default function JournalPageHeading({ headlineText }) {
  // const session = await auth();
  const { user } = useAppSelector((state) => state.authInfo);
  return (
    <>
      <p className="uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        Welcome, {user?.name || "Guest"}
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
        {headlineText}
      </h1>
    </>
  );
}

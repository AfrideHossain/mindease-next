import { Button } from "../ui/button";
import Link from "next/link";
import { NotebookIcon, PlusIcon } from "lucide-react";

export default function JournalEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 space-y-4 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md rounded-3xl border border-neutral-200/50 dark:border-neutral-800 shadow-sm">
      <NotebookIcon className="h-10 w-10 text-neutral-400 dark:text-neutral-500" />
      <h2 className="text-lg font-medium text-neutral-700 dark:text-neutral-300">
        No journals found
      </h2>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm">
        Start documenting your thoughts — click “New Journal” to begin your
        journey.
      </p>
      <Button
        asChild
        className="mt-2 rounded-full text-sm bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-all"
      >
        <Link href="/journal/create">
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Journal
        </Link>
      </Button>
    </div>
  );
}

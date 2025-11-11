import { readSingleJournalById } from "@/app/actions/journal/singleJournalAction";
import { Button } from "@/components/ui/button";
import { MOODS } from "@/lib/validations.journal";
import { ArrowLeftIcon, SmileIcon } from "lucide-react";
import Link from "next/link";

export default async function SingleJournalPage({ params }) {
  const { id } = await params;
  const journalresponse = await readSingleJournalById(id);

  if (!journalresponse.success) {
    throw new Error(journalresponse.error);
  }

  const journal = journalresponse.data;

  return (
    <section className="w-full min-h-screen flex flex-col items-center px-4 py-10">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Button
            asChild
            variant={"ghost"}
            className={
              "hover:bg-transparent dark:hover:bg-transparent hover:text-neutral-400"
            }
          >
            <Link href="/journal" className="inline-flex items-center">
              <ArrowLeftIcon />
              Back to Journals
            </Link>
          </Button>

          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <SmileIcon className="h-4 w-4 text-amber-500" />
            <span className="font-medium">{MOODS[journal.mood]}</span>
          </div>
        </div>

        {/* Title + Meta */}
        <div className="border-b pb-4 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
            {journal.title}
          </h1>
          <p className="text-sm text-neutral-500">
            {new Date(journal.date).toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap leading-relaxed text-neutral-700 dark:text-neutral-200">
            {journal.content}
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { getAllJournals } from "../actions/journal/journalsAction";
import JournalPageHeading from "@/components/Journal/JournalPageHeading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import JournalSmallCard from "@/components/Journal/JournalSmallCard";
import JournalEmptyState from "@/components/Journal/JournalEmptyState";
import { PlusIcon } from "lucide-react";
import DatePicker from "@/components/Journal/DatePicker";

export default function JournalsPage() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterDate, setFilterDate] = useState(new Date());
  useEffect(() => {
    const fetchJournals = async () => {
      setLoading(true);
      try {
        const response = await getAllJournals(filterDate);
        if (response.success) {
          setJournals(JSON.parse(response.data));
        } else {
          setError(response.error || "Failed to load journals");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching journals.");
      } finally {
        setLoading(false);
      }
    };
    fetchJournals();
  }, [filterDate]);

  // console.log(journals);
  return (
    // <>Hello journals page</>
    <section className="min-h-screen w-full flex flex-col items-center py-16 px-6">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 border-b border-neutral-200/60 dark:border-neutral-800 pb-6">
          <div className="space-y-2">
            <JournalPageHeading headlineText={"Memory log of the day"} />
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Capture your thoughts, emotions, and reflections — one day at a
              time.
            </p>
          </div>
          <div className="space-y-4">
            <DatePicker setFilterDate={setFilterDate} />
            <Button
              asChild
              className="w-full rounded-full text-sm font-medium bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-all shadow-sm"
            >
              <Link href="/journal/create" className="flex items-center gap-2">
                <PlusIcon className="w-4 h-4" /> New Journal
              </Link>
            </Button>
          </div>
        </div>
        {/* Loading / Error / Journals */}
        {loading ? (
          <p className="text-center text-neutral-500 dark:text-neutral-400 py-20">
            Loading your journals...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 py-20">{error}</p>
        ) : journals.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-stretch">
            {journals.map((journal) => (
              <JournalSmallCard key={journal._id} journal={journal} />
            ))}
          </div>
        ) : (
          <JournalEmptyState />
        )}
      </div>
    </section>
  );
}

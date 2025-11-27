"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { journalSchema } from "@/lib/validations.journal";
import JournalForm from "@/components/Journal/JournalForm";
import {
  readSingleJournalById,
  updateJournalById,
} from "@/app/actions/journal/singleJournalAction";
import JournalPageHeading from "@/components/Journal/JournalPageHeading";

export default function JournalEdit() {
  const { id } = useParams();
  const router = useRouter();

  const [defaultJournal, setDefaultJournal] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⏳ Fetch existing journal
  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await readSingleJournalById(id);
        if (response.success) {
          setDefaultJournal(JSON.parse(response.data));
        } else {
          toast.error("Failed to load journal.");
        }
      } catch (error) {
        toast.error("Something went wrong while fetching journal.");
      } finally {
        setLoading(false);
      }
    };
    fetchJournal();
  }, [id]);

  // 📝 Initialize form
  const form = useForm({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      title: "",
      content: "",
      mood: "",
      date: new Date(),
    },
  });

  // ⏱️ Set fetched journal as default values dynamically
  useEffect(() => {
    if (defaultJournal) {
      form.reset({
        title: defaultJournal.title || "",
        content: defaultJournal.content || "",
        mood: defaultJournal.mood || "",
        date: new Date(defaultJournal.date),
      });
    }
  }, [defaultJournal, form]);

  // 💾 Handle Submit
  const onSubmit = async (values) => {
    try {
      const response = await updateJournalById(id, values);
      if (response.success) {
        toast.success("Journal updated successfully!");
        router.push(`/journal/${id}`);
      } else {
        toast.error(response.error || "Failed to update journal");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-neutral-500">
        Loading journal...
      </div>
    );
  }

  if (!defaultJournal) {
    return (
      <div className="flex h-screen items-center justify-center text-neutral-500">
        Journal not found.
      </div>
    );
  }

  return (
    <section className="min-h-screen w-full py-16 px-6 flex flex-col">
      <div className="mb-10 border-b border-neutral-200/60 dark:border-neutral-800 pb-6 space-y-2">
        <JournalPageHeading headlineText={"Edit Journal"} />
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Update your reflections or add new insights.
        </p>
      </div>
      <div className="w-full flex justify-center items-center">
        <JournalForm form={form} onSubmit={onSubmit} />
      </div>
    </section>
  );
}

"use client";

import JournalForm from "@/components/Journal/JournalForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { journalSchema } from "@/lib/validations.journal";
import { toast } from "sonner";

export default function CreateJournalPage() {
  const form = useForm({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      title: "",
      content: "",
      mood: "",
      date: new Date(),
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Submitting journal:", data);
      // Example: POST to API
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result?.error || "Failed to create journal");
        return;
      }

      toast.success("Journal created successfully!");
      form.reset(); // clear form
    } catch (err) {
      console.error("Error submitting journal:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <JournalForm form={form} onSubmit={onSubmit} />
    </div>
  );
}

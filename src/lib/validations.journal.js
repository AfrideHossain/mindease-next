import { z } from "zod";

export const journalSchema = z.object({
  title: z.string().min(3, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  mood: z.string().nonempty("Please select a mood"),
  date: z.date({ required_error: "Please select a date" }),
});

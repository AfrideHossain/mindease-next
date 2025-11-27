"use client";

import { deleteOneJournalById } from "@/app/actions/journal/singleJournalAction";
import { AlertDialogAction } from "../ui/alert-dialog";
import { toast } from "sonner";

export default function DeleteJournalActionButton({ id, setJournals }) {
  const handleDeleteJournal = async () => {
    try {
      const response = await deleteOneJournalById(id);
      if (response.success) {
        setJournals((prev) => prev.filter((item) => item._id !== id));
        toast.success("Journal has been deleted");
      } else {
        toast.error(response.error || "Failed to delete journal");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };
  return (
    <>
      <AlertDialogAction onClick={handleDeleteJournal}>
        Continue
      </AlertDialogAction>
    </>
  );
}

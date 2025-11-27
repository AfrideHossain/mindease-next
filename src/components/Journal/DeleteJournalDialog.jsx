import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeleteJournalActionButton from "./DeleteJournalActionButton";

export default function DeleteJournalDialog({ id, setJournals }) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"}>
            <Trash2 className={"text-red-500"} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className={"bg-background dark:bg-background"}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              log (<strong className="text-red-500">Journal</strong>
              {" and "}
              <strong className="text-red-500">Mood</strong>) and remove from
              our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <DeleteJournalActionButton id={id} setJournals={setJournals} />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

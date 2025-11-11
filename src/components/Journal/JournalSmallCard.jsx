import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { PenBoxIcon, SmileIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { MOODS } from "@/lib/validations.journal";
import NavigateToEdit from "./NavigateToEdit";
export default function JournalSmallCard({ journal }) {
  if (!journal) return null;

  const { title, content, mood, date } = journal;
  // console.log({ content });

  const preview =
    content?.split(" ").slice(0, 25).join(" ") +
      (content?.split(" ").length > 25 ? "…" : "") || "No content available";

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title || "Journal Title"}</CardTitle>
        <CardDescription>
          {new Date(date).toDateString() || new Date().toDateString()}
        </CardDescription>
        <CardAction className={"space-x-4"}>
          <NavigateToEdit originPath={`/journal/${journal._id.toString()}`} />
          <Button variant={"destructive"}>
            <Trash2 className={"text-red-500"} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{preview}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <SmileIcon className="h-5 w-5 text-amber-500" />
          <p className="text-sm">{MOODS[mood] || "Happy"}</p>
        </div>
        <Button asChild className={"rounded-full"}>
          <Link href={`/journal/${journal._id.toString()}`}>Read now</Link>
        </Button>
        {/* <Badge className="text-sm px-6 py-2 capitalize">
            {MOODS[mood] || "Happy"}
          </Badge> */}
      </CardFooter>
    </Card>
  );
}

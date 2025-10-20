import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
export default function CreateJournalPage() {
  return (
    <div className="min-h-screen border-0 border-red-500 flex justify-center items-center p-4">
      <div className="w-full max-w-5xl border p-4 rounded-2xl">
        <form>
          <FieldGroup>
            <FieldSet>
              <FieldGroup className={"md:flex-row"}>
                <Field>
                  <FieldLabel htmlFor="journal-title">Headline</FieldLabel>
                  <Input
                    id="journal-title"
                    placeholder="Journal headline"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="mood-select">Mood today</FieldLabel>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Happy or Sad?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="happy">😃 Happy</SelectItem>
                        <SelectItem value="sad">😔 Sad</SelectItem>
                        <SelectItem value="neutral">😐 Neutral</SelectItem>
                        <SelectItem value="anxious">😰 Anxious</SelectItem>
                        <SelectItem value="excited">🤩 Excited</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="journal-content">
                    Journal content
                  </FieldLabel>
                  <Textarea
                    id="journal-content"
                    placeholder="What's on your mind?"
                    className="min-h-120"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <Field orientation="horizontal">
              <Button type="submit">Save</Button>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}

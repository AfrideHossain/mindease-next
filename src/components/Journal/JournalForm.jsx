"use client";

import { Button } from "@/components/ui/button";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import DatePicker from "./DatePicker";

export default function JournalForm({ form, onSubmit }) {
  const { control, handleSubmit, setValue } = form;

  return (
    <div className="w-full max-w-3xl border p-6 rounded-2xl shadow-sm bg-background">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FieldLabel>Headline</FieldLabel>
                <FormControl>
                  <Input placeholder="Journal headline" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FieldSet>
            <FieldGroup className={"md:flex-row *:flex-1"}>
              <FormField
                control={control}
                name="mood"
                render={({ field }) => (
                  <FormItem>
                    <FieldLabel>Mood today</FieldLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full bg-transparent dark:dark:bg-input/30">
                          <SelectValue placeholder="How do you feel?" />
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="date"
                render={() => (
                  <FormItem>
                    <FieldLabel>Date</FieldLabel>
                    <DatePicker setHookFormValue={setValue} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FormField
              control={control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Journal Content</FieldLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What's on your mind?"
                      className="min-h-[160px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldSet>

          <div className="flex gap-3 justify-end">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving" : "Save"}
            </Button>
            <Button type="reset" variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

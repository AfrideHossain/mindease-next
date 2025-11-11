"use client";

import { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date) {
  return date?.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function DatePicker({ setHookFormValue, setFilterDate }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date);

  useEffect(() => {
    setHookFormValue && setHookFormValue("date", date);
    setFilterDate && setFilterDate(date);
  }, [date, setHookFormValue, setFilterDate]);

  return (
    <div className="relative flex items-center gap-2">
      <Input
        id="date"
        readOnly
        value={formatDate(date)}
        placeholder="Select a date"
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-background pr-10"
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <CalendarIcon className="size-4" />
            <span className="sr-only">Select date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end" sideOffset={10}>
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            onMonthChange={setMonth}
            month={month}
            onSelect={(date) => {
              setDate(date);
              setMonth(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

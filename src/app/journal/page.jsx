import React from "react";

export default function JournalPage() {
  return (
    <section className="container mx-auto min-h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-7xl font-bold capitalize">This is journal page</h1>
      <p className="text-lg font-medium">
        This is journal page and it's temporarily protected means one can't
        access without log in.
      </p>
    </section>
  );
}

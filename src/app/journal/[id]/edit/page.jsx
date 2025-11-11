"use client";

import { use } from "react";

export default function JournalEdit({ params }) {
  const { id } = use(params)
  return <div>JournalEdit {id}</div>;
}

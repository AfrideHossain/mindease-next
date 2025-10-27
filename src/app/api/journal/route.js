import { auth } from "@/auth";
import { connectToDb } from "@/lib/db";
import Journal from "@/models/journal-model";
import { NextResponse } from "next/server";
export async function POST(request) {
  // console.log("Request started...");
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized request from unknown user");
  }
  // TODO: add ZOD validation and refactor
  try {
    const { title, mood, date, content } = await request.json();
    console.log({ title, mood, date, content });

    //connect to database
    await connectToDb();
    // console.log("From create journal api=> ", session);
    const newJournalDoc = {
      userId: session.user.id,
      title,
      mood,
      date,
      content,
    };

    const newJournal = await Journal.create(newJournalDoc);
    return NextResponse.json({ success: true, newJournal });
  } catch (error) {
    console.error(error);
    throw NextResponse.json("Internal server error", { status: 500 });
  }
}

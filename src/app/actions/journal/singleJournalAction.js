"use server";

import { auth } from "@/auth";
import { connectToDb } from "@/lib/db";
import Journal from "@/models/journal-model";

export async function readSingleJournalById(journalId) {
  // console.log({ journalId });
  try {
    // check auth
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized user" };
    }

    // connect to database
    await connectToDb();

    //get journal
    const journal = await Journal.findById(journalId)
      .populate("userId", "name email")
      .lean();
    // console.log({ journal });

    if (!journal) {
      return { success: false, message: "Journal not found" };
    }
    return {
      success: true,
      data: journal,
    };
  } catch (error) {
    console.error("❌ readSingleJournalById() error:", error);
    return {
      success: false,
      error: error.message || "Internal Server Error",
    };
  }
}

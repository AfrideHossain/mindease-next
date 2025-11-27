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
      data: JSON.stringify(journal),
    };
  } catch (error) {
    console.error("❌ [readSingleJournalById] error:", error);
    return {
      success: false,
      error: error.message || "Internal Server Error",
    };
  }
}

export async function updateJournalById(id, data) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      throw new Error("Unauthorized user");
    }

    await connectToDb();

    const updated = await Journal.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      {
        $set: {
          title: data.title,
          content: data.content,
          mood: data.mood,
          date: data.date,
        },
      },
      { new: true }
    );

    if (!updated) {
      throw new Error("Journal not found or unauthorized");
    }

    return {
      success: true,
      data: JSON.stringify(updated),
    };
  } catch (error) {
    console.error("[updateJournalById] Error:", error);
    return {
      success: false,
      error: error.message || "Internal Server Error",
    };
  }
}

// delete a journal
export async function deleteOneJournalById(id) {
  try {
    // check authentication
    const session = await auth();
    if (!session || !session.user?.id) {
      throw new Error("Unauthorized user");
    }

    // connect to database
    await connectToDb();

    const deleted = await Journal.findByIdAndDelete(id);
    console.log(deleted);

    if (!deleted) {
      return {
        success: false,
        message: `Journal not found or unable to delete`,
      };
    }

    return { success: true, message: "Journal has been deleted" };
  } catch (error) {
    console.error("[deleteOneJournalById] Error", error);
  }
}

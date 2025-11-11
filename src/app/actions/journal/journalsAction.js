"use server";

import { auth } from "@/auth";
import { connectToDb } from "@/lib/db";
import Journal from "@/models/journal-model";

export async function getAllJournals(filterDate) {
  // console.log(filterDate);
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      throw new Error("Unauthorized user");
    }

    // connect database
    await connectToDb();

    // define query
    let query = { userId: session.user.id };

    if (filterDate) {
      const startOfDay = new Date(filterDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(filterDate);
      endOfDay.setHours(23, 59, 59, 999);

      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    // console.log(query);

    // fetch journals
    const journals = await Journal.find(query).sort({ createdAt: -1 }).lean();

    return {
      success: true,
      count: journals.length,
      data: JSON.stringify(journals),
    };
  } catch (error) {
    console.error("[Func] [getAllJournals] Error: ", error);

    return {
      success: false,
      error: error.message || "Internal Server Error",
    };
  }
}

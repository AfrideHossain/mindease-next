import { auth } from "@/auth";
import { connectToDb } from "@/lib/db";
import { journalSchema } from "@/lib/validations.journal";
import Journal from "@/models/journal-model";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // ✅ 1. Auth check
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized request" },
        { status: 401 }
      );
    }

    // ✅ 2. Parse & validate input
    const requestBody = await request.json();
    // const validatedData = journalSchema.safeParse(requestBody);

    // if (!validatedData.success) {
    //   return NextResponse.json(
    //     { error: "Invalid input data", issues: validatedData.error },
    //     { status: 400 }
    //   );
    // }

    // const { title, mood, date, content } = validatedData.data;
    const { title, mood, date, content } = requestBody;

    // ✅ 3. Connect to DB (only when needed)
    await connectToDb();

    // ✅ 4. Create new journal document
    const newJournal = await Journal.create({
      userId: session.user.id,
      title,
      mood,
      date,
      content,
    });

    // ✅ 5. Send clean response
    return NextResponse.json(
      { success: true, data: newJournal },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/journals error:", error);

    // ✅ 6. Catch all fallback
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

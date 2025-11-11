import { auth } from "@/auth";
import { connectToDb } from "@/lib/db";
// import { journalSchema } from "@/lib/validations.journal";
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

// get all journals

export async function GET() {
  try {
    // ✅ Step 1: Authentication Check
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized request" },
        { status: 401 }
      );
    }

    // ✅ Step 2: Connect to Database
    await connectToDb();

    // ✅ Step 3: Fetch Journals for Logged-in User
    const journals = await Journal.find({ userId: session.user.id })
      .sort({ createdAt: -1 }) // optional: newest first
      .lean();

    // ✅ Step 4: Return Response
    return NextResponse.json(
      { success: true, count: journals.length, data: journals },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Journals API GET Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

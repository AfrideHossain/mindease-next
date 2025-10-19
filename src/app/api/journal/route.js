// import { getServerSession } from "next-auth";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
export async function POST(formData) {
  const session = await auth();
  console.log(session);

  return NextResponse.json(session);

  const { title, mood, date, content } = formData;
}

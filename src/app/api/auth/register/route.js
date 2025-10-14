import { signupSchema } from "@/lib/validations.auth";
import { NextResponse } from "next/server";
import User from "@/models/user-model";
import { connectToDb } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const reqBody = await request.json();
  // validation
  const validatedData = signupSchema.safeParse(reqBody);

  if (!validatedData.success) {
    return NextResponse.json("Invalid data.", { status: 400 });
  }
  try {
    const { name, email, password } = validatedData.data;
    // connect to the database
    await connectToDb();
    // check if user already exists
    const isUserExists = await User.findOne({ email }).lean();
    if (isUserExists) {
      return NextResponse.json(
        { error: "User already registered" },
        { status: 400 }
      );
    }
    // const hashedPass = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      // password: hashedPass,
      password,
    });

    // save new user
    await newUser.save();
    //   send response
    return NextResponse.json(
      { success: true, message: "User registered successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 400 }
    );
  }
}

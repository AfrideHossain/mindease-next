import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { connectToDb } from "./lib/db";
import User from "./models/user-model";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email", placeholder: "Email address" },
        password: {
          label: "password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        console.log("Starting authorize...");

        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Missing email or password");
        }

        await connectToDb();

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
          throw new Error("No user found with this credential");
        }

        const isValidPassword = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        const user = {
          id: existingUser._id.toString(),
          name: existingUser.name,
          email: existingUser.email,
        };

        console.log("✅ User authorized:", user);
        return user;
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
  },
  secret: process.env.AUTH_SECRET,
});

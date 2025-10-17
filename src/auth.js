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
        console.log("starting authorize==> \n");
        console.log({ credentials }, "\n");
        // check if credentials are provided or not
        if (!credentials.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        try {
          // connect to database
          await connectToDb();

          // check if user exists
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found with this credential");
          }

          // check password
          const isValidPassword = bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            // role: user.role
          };
        } catch (error) {
          console.error("Authorize error: ", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
  },
});

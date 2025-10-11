import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";

const { default: NextAuth } = require("next-auth");

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
  providers: [CredentialsProvider({
      
  })],
});

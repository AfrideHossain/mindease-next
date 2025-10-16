export const authConfig = {
  pages: {
    signIn: "/login",
    // error: "/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [],
  callbacks: {
    async token(user, token) {
      if (user) {
        token.id = user.id || user._id?.toString();
        token.email = user.email;
      }
      return token;
    },
    async session(session, token) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

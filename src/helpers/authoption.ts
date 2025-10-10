import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          // 🔹 তোমার backend এর /auth/login route এ POST request পাঠানো হচ্ছে
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (!res.ok) {
            console.error("❌ Login failed:", await res.text());
            return null;
          }

          const user = await res.json();

          // 🔹 নিশ্চিত হও backend থেকে `_id`, `name`, `email` আসে
          if (user && user._id) {
            return {
              id: user._id,
              name: user.name,
              email: user.email,
            };
          }

          return null;
        } catch (error) {
          console.error("❌ Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/Login", // ensure route name matches your page name
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as typeof session.user;
      return session;
    },
  },
};
  
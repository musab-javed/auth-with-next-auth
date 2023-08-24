import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { findOne } from "@/helpers/dbHelper";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const res = await fetch("http:localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        if (res.status != 200) return null;
        const user = await res.json();
        if (!user) return null;
        return user;
      },
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "someone@email.com",
        },
        password: {
          label: "password",
          type: "text",
          placeholder: "password",
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  // secret: process.env.auth_secret,
  debug: true,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session: session }) {
      return session;
    },
    async signIn({ profile }) {
      try {
        console.log(profile);
        const user = findOne({ email: "musab@ambeego.com" });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

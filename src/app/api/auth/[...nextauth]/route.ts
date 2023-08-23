import NextAuth, { AuthOptions, Awaitable } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { findOne } from "@/helpers/dbHelper";
import { User } from "@/types/user";
import { auth } from "firebase-functions";

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
        if(res.status != 200) return null;
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
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.auth_secret,
  debug: true,
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

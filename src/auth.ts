import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";
import prisma from "./lib/prisma";
import { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Google,
  Facebook,
  GitHub,
  // LinkedInProvider({
  //   clientId: process.env.AUTH_LINKEDIN_ID,
  //   clientSecret: process.env.AUTH_LINKEDIN_SECRET,
  //   authorization: { params: { scope: 'profile email openid' } },
  //   issuer: 'https://www.linkedin.com/oauth',
  //   jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
  //   async profile(profile) {
  //     return {
  //       id: profile.sub,
  //       name: profile.name,
  //       firstname: profile.given_name,
  //       lastname: profile.family_name,
  //       email: profile.email
  //     }
  //   },
  // }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  theme: {
    logo: "/3D_Logo.png",
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
  providers,
  pages: {
    signIn: "/signin",
  },
})
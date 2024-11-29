import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/NavBar";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import {NextUIProvider} from "@nextui-org/system";
import { Inter } from "next/font/google";
import { headers } from "next/headers"; // Permet d'accéder aux headers dans le serveur
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Next-Auth V5 Tutorial",
    absolute: "Next-Auth V5 tutorial",
  },
  description:
    "Learn how to use Auth.js v5 in Next.js with custom roles, caching, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Lire l'en-tête x-is-signin défini par le middleware
  const headersList = headers();
  const isSignInRoute = headersList.get("x-is-signin") === "true";

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <NextUIProvider>
            {/* Afficher la NavBar uniquement si ce n'est pas la page de connexion */}
            {!isSignInRoute && <NavBar />}
            {children}
            <Toaster />
          </NextUIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

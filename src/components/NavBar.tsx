"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import UserButton from "./UserButton";
import { Button } from "./ui/button";
import useTheme from "@/app/hooks/useTheme";

export default function NavBar() {
  const session = useSession();
  const user = session.data?.user;
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-background px-4 shadow-sm">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4">
        {/* Logo ou lien principal */}
        <Link href="/" className="text-lg font-bold text-primary hover:underline">
          Next-Auth v5 Tutorial
        </Link>

        {/* Actions : Thème et Authentification */}
        <div className="flex items-center gap-4">
          {/* Bouton de bascule du thème */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-md p-2 transition-colors 
                       bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 
                       dark:text-gray-200 dark:hover:bg-gray-600"
          >
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {/* Bouton utilisateur ou connexion */}
          {user ? <UserButton user={user} /> : session.status !== "loading" && <SignInButton />}
        </div>
      </nav>
    </header>
  );
}

function SignInButton() {
  return (
    <Button onClick={() => signIn()} className="px-4 py-2">
      Sign in
    </Button>
  );
}

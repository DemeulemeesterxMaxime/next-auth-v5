"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SignInPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  return (
    <div className="animate-gradientAnimation flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-gray-800 dark:text-gray-200">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl dark:bg-gray-800">
        {/* Titre principal */}
        <h1 className="mb-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Welcome Back
        </h1>

        {/* Logo */}
        <div className="mb-6 flex items-center justify-center">
          <Image
            src="/3D.svg"
            width={200}
            height={200}
            alt="Platform Logo"
            priority
          />
        </div>

        {/* Sous-titre */}
        <p className="mb-6 text-center text-gray-600 dark:text-gray-400">
          Sign in to continue to our platform.
        </p>

        {/* Boutons pour les fournisseurs */}
        <div className="flex flex-col gap-4">
          <SignInButton
            provider="google"
            color="bg-red-600"
            hoverColor="hover:bg-red-700"
            label="Sign in with Google"
            callbackUrl={searchParams?.callbackUrl || "/"}
          />
          <SignInButton
            provider="facebook"
            color="bg-blue-600"
            hoverColor="hover:bg-blue-700"
            label="Sign in with Facebook"
            callbackUrl={searchParams?.callbackUrl || "/"}
          />
          <SignInButton
            provider="github"
            color="bg-gray-800"
            hoverColor="hover:bg-gray-700"
            label="Sign in with GitHub"
            callbackUrl={searchParams?.callbackUrl || "/"}
          />
        </div>
      </div>
    </div>
  );
}

/** Composant réutilisable pour les boutons de connexion */
function SignInButton({
  provider,
  color,
  hoverColor,
  label,
  callbackUrl,
}: {
  provider: string;
  color: string;
  hoverColor: string;
  label: string;
  callbackUrl: string;
}) {
  return (
    <button
      onClick={() => signIn(provider, { callbackUrl })}
      className={`relative flex w-full items-center justify-center gap-2 rounded-md border p-3 transition-all ${
        provider === "google"
          ? "border-gray-300 bg-white text-black hover:bg-gray-100"
          : provider === "github"
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : provider === "facebook"
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : ""
      }`}
    >
      {provider === "google" && (
        <div className="absolute left-4">
          <Image src="/google.png" width={20} height={20} alt="Google Logo" />
        </div>
      )}
      {provider === "github" && (
        <div className="absolute left-4">
          <Image src="/github.png" width={30} height={30} alt="GitHub Logo" />
        </div>
      )}
      {provider === "facebook" && (
        <div className="absolute left-4">
          <Image
            src="/facebook.png"
            width={30}
            height={30}
            alt="Facebook Logo"
          />
        </div>
      )}
      <span className="font-medium">{label}</span>
    </button>
  );
}

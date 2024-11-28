// app/middleware.ts
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

// Si vous avez un fichier @/auth.ts et que vous souhaitez utiliser son exportation "auth",
// vous devez faire attention à ne pas écraser les autres exports.

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Vérifiez si la route actuelle est /signin
  if (pathname === "/signin") {
    // On ajoute une information dans les headers pour savoir si on est sur /signin
    const response = NextResponse.next();
    response.headers.set("x-is-signin", "true");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/some-other-path"], // Matcher plusieurs routes si nécessaire
};

// Si vous avez une logique d'authentification dans @/auth, vous pouvez l'importer ici.
//export { auth as middleware } from "@/auth";

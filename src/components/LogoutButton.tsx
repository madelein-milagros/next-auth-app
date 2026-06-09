"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/signIn" })}
      className="bg-brand-4 hover:bg-brand-3 text-brand-1 font-bold py-2 px-4 rounded transition-colors"
    >
      Cerrar Sesión
    </button>
  );
}

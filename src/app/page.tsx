import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-screen">
      <div className="max-w-2xl bg-brand-5 p-12 rounded-2xl shadow-xl border border-brand-2">
        <h1 className="text-4xl font-bold text-brand-1 mb-6">
          Bienvenido al Laboratorio
        </h1>
        <p className="text-lg text-brand-2 mb-8">
          Inicia sesión para acceder a las herramientas y datos del laboratorio universitario.
        </p>
        <Link 
          href="/signIn"
          className="inline-block bg-brand-3 hover:bg-brand-4 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300"
        >
          Ir a Iniciar Sesión
        </Link>
      </div>
    </main>
  );
}

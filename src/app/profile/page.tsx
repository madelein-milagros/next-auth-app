import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signIn");
  }

  const user = session.user;
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-brand-1 p-8 text-brand-5 flex flex-col items-center">
      <header className="w-full max-w-2xl flex justify-between items-center mb-8">
        <Link href="/dashboard" className="text-brand-4 hover:text-brand-3 font-semibold transition-colors">
          &larr; Volver al Dashboard
        </Link>
        <LogoutButton />
      </header>

      <main className="w-full max-w-2xl bg-brand-5 text-brand-1 p-10 rounded-3xl shadow-2xl border border-brand-3 flex flex-col items-center">
        <div className="relative w-32 h-32 mb-6">
          {user?.image ? (
            <Image 
              src={user.image} 
              alt="Profile Picture" 
              fill
              className="rounded-full object-cover border-4 border-brand-3 shadow-lg"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-brand-2 flex items-center justify-center border-4 border-brand-3 shadow-lg text-brand-5 text-5xl font-bold">
              {initial}
            </div>
          )}
        </div>

        <h1 className="text-3xl font-bold mb-2 text-center">{user?.name || "Usuario del Laboratorio"}</h1>
        <p className="text-lg text-brand-2 mb-8 text-center">{user?.email}</p>

        <div className="w-full bg-white p-6 rounded-xl border border-brand-2 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-brand-1 border-b border-brand-2 pb-2">
            Detalles de la Cuenta
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-brand-2">Nombre Completo</p>
              <p className="font-medium">{user?.name || "No proporcionado"}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-2">Correo Electrónico</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-2">Rol</p>
              <p className="font-medium">Investigador</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-2">Estado</p>
              <p className="font-medium text-green-600">Activo</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

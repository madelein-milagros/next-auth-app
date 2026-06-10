import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signIn");
  }

  return (
    <div className="min-h-screen bg-brand-1 p-8 text-brand-5 flex flex-col items-center">
      <header className="w-full max-w-4xl flex justify-between items-center mb-12 bg-brand-2 p-6 rounded-xl shadow-lg border border-brand-3">
        <h1 className="text-2xl font-bold">Dashboard del Laboratorio</h1>
        <div className="flex items-center gap-4">
          <span className="font-semibold hidden sm:inline">{session.user?.name || session.user?.email}</span>
          <LogoutButton />
        </div>
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-brand-5 text-brand-1 p-8 rounded-2xl shadow-xl border border-brand-3">
          <h2 className="text-2xl font-bold mb-4">Bienvenido de nuevo</h2>
          <p className="text-brand-2 mb-6">
            Aquí encontrarás los accesos rápidos a tus proyectos y configuraciones.
          </p>
          <Link 
            href="/profile"
            className="inline-block bg-brand-4 hover:bg-brand-3 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md"
          >
            Ver Mi Perfil
          </Link>
        </div>

        <div className="bg-brand-2 text-brand-5 p-8 rounded-2xl shadow-xl border border-brand-4">
          <h2 className="text-2xl font-bold mb-4">Métricas Recientes</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center border-b border-brand-3 pb-2">
              <span>Experimentos Activos</span>
              <span className="font-bold text-brand-4">3</span>
            </li>
            <li className="flex justify-between items-center border-b border-brand-3 pb-2">
              <span>Reportes Pendientes</span>
              <span className="font-bold text-brand-4">1</span>
            </li>
            <li className="flex justify-between items-center border-b border-brand-3 pb-2">
              <span>Alertas</span>
              <span className="font-bold text-red-400">0</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

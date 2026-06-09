"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-1 to-brand-2 p-4">
      <div className="w-full max-w-md bg-brand-5 rounded-2xl shadow-2xl p-8 border border-brand-3">
        <h2 className="text-3xl font-bold text-brand-1 text-center mb-8">Iniciar Sesión</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm text-center font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-brand-1 text-sm font-bold mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-brand-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-3 text-brand-1 bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-brand-1 text-sm font-bold mb-2">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-brand-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-3 text-brand-1 bg-white"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-brand-3 hover:bg-brand-4 text-white font-bold py-3 px-4 rounded transition-colors shadow-md"
          >
            Entrar
          </button>
        </form>

        <div className="flex items-center justify-between mb-6">
          <hr className="w-full border-brand-2 opacity-30" />
          <span className="p-2 text-brand-2 text-sm font-semibold">O</span>
          <hr className="w-full border-brand-2 opacity-30" />
        </div>

        <div className="space-y-3">
          <button 
            type="button"
            onClick={() => {
              console.log("Clic en Google...");
              signIn("google", { callbackUrl: "/dashboard" });
            }}
            className="w-full flex items-center justify-center gap-3 bg-white border border-brand-2 text-brand-1 hover:bg-gray-50 font-semibold py-2 px-4 rounded transition-colors shadow-sm"
          >
            <FaGoogle className="text-red-500" />
            Continuar con Google
          </button>
          
          <button 
            type="button"
            onClick={() => {
              console.log("Clic en GitHub...");
              signIn("github", { callbackUrl: "/dashboard" });
            }}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white hover:bg-gray-800 font-semibold py-2 px-4 rounded transition-colors shadow-sm"
          >
            <FaGithub />
            Continuar con GitHub
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-brand-2">
          ¿No tienes cuenta? <Link href="/register" className="text-brand-3 hover:text-brand-4 font-bold">Regístrate</Link>
        </div>
      </div>
    </div>
  );
}

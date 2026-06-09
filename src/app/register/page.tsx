"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al registrar usuario");
      } else {
        setSuccess("Registro exitoso. Redirigiendo a inicio de sesión...");
        setTimeout(() => {
          router.push("/signIn");
        }, 2000);
      }
    } catch (err) {
      setError("Ocurrió un error inesperado");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-1 to-brand-2 p-4">
      <div className="w-full max-w-md bg-brand-5 rounded-2xl shadow-2xl p-8 border border-brand-3">
        <h2 className="text-3xl font-bold text-brand-1 text-center mb-8">Crear Cuenta</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm font-semibold">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm font-semibold">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-brand-1 text-sm font-bold mb-2">Nombre</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-brand-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-3 text-brand-1 bg-white"
              required
            />
          </div>
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
          <div>
            <label className="block text-brand-1 text-sm font-bold mb-2">Confirmar Contraseña</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-brand-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-3 text-brand-1 bg-white"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-brand-3 hover:bg-brand-4 text-white font-bold py-3 px-4 rounded transition-colors shadow-md mt-4"
          >
            Registrarse
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-brand-2">
          ¿Ya tienes cuenta? <Link href="/signIn" className="text-brand-3 hover:text-brand-4 font-bold">Inicia Sesión</Link>
        </div>
      </div>
    </div>
  );
}

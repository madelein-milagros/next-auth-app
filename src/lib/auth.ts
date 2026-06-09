import bcrypt from "bcryptjs";

// Simulación de base de datos en memoria
// Nota: En desarrollo con Next.js (Fast Refresh), este objeto podría reiniciarse
// al guardar archivos.
const usersDB: any[] = [];
const lockoutDB: Record<string, { attempts: number; lockoutUntil: number | null }> = {};

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutos

export async function registerUser(name: string, email: string, passwordStr: string) {
  // Verificar si el usuario ya existe
  const existingUser = usersDB.find((u) => u.email === email);
  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  // Hashear la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(passwordStr, salt);

  // Crear usuario
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
  };

  usersDB.push(newUser);
  return { id: newUser.id, name: newUser.name, email: newUser.email };
}

export async function authenticateUser(email: string, passwordStr: string) {
  const now = Date.now();
  const userLockInfo = lockoutDB[email] || { attempts: 0, lockoutUntil: null };

  // Verificar si la cuenta está bloqueada
  if (userLockInfo.lockoutUntil && now < userLockInfo.lockoutUntil) {
    const remainingMinutes = Math.ceil((userLockInfo.lockoutUntil - now) / 60000);
    throw new Error(`Cuenta bloqueada. Inténtalo de nuevo en ${remainingMinutes} minuto(s).`);
  }

  const user = usersDB.find((u) => u.email === email);
  if (!user) {
    recordFailedAttempt(email);
    throw new Error("Credenciales inválidas");
  }

  // Verificar contraseña
  const isMatch = await bcrypt.compare(passwordStr, user.password);
  if (!isMatch) {
    recordFailedAttempt(email);
    throw new Error("Credenciales inválidas");
  }

  // Si el login es exitoso, reiniciar intentos
  lockoutDB[email] = { attempts: 0, lockoutUntil: null };

  return { id: user.id, name: user.name, email: user.email };
}

function recordFailedAttempt(email: string) {
  const now = Date.now();
  if (!lockoutDB[email]) {
    lockoutDB[email] = { attempts: 0, lockoutUntil: null };
  }

  lockoutDB[email].attempts += 1;

  if (lockoutDB[email].attempts >= MAX_ATTEMPTS) {
    lockoutDB[email].lockoutUntil = now + LOCKOUT_DURATION_MS;
  }
}

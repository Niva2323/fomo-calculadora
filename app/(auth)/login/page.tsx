import Link from "next/link";
import { login, loginWithGoogle } from "@/app/actions/auth";
import { AuthMessage } from "../auth-message";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string }>;
}) {
  const { error, notice } = await searchParams;

  return (
    <>
      <p className="auth-eyebrow">ACCESO DE USUARIO</p>
      <h2>Entra en tu sala.</h2>
      <p className="auth-description">Continúa con tu cuenta de FOMO WAR ROOM.</p>
      <AuthMessage error={error} notice={notice} />

      <form action={login} className="auth-form">
        <label htmlFor="login-email">Correo electrónico</label>
        <input id="login-email" name="email" type="email" autoComplete="email" required />
        <label htmlFor="login-password">Contraseña</label>
        <input id="login-password" name="password" type="password" autoComplete="current-password" minLength={8} required />
        <button className="auth-submit" type="submit">Iniciar sesión</button>
      </form>

      <div className="auth-divider"><span>o continúa con</span></div>
      <form action={loginWithGoogle}>
        <button className="google-button" type="submit"><span aria-hidden="true">G</span>Google</button>
      </form>

      <p className="auth-switch">¿Aún no tienes cuenta? <Link href="/registro">Crear cuenta</Link></p>
    </>
  );
}
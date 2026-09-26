import Link from "next/link";
import { register, loginWithGoogle } from "@/app/actions/auth";
import { AuthMessage } from "../auth-message";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string }>;
}) {
  const { error, notice } = await searchParams;

  return (
    <>
      <p className="auth-eyebrow">NUEVO PERFIL</p>
      <h2>Crea tu cuenta.</h2>
      <p className="auth-description">Prepara tu perfil de comandante.</p>
      <AuthMessage error={error} notice={notice} />

      <form action={register} className="auth-form">
        <label htmlFor="register-name">Nombre</label>
        <input id="register-name" name="name" type="text" autoComplete="name" minLength={2} required />
        <label htmlFor="register-email">Correo electrónico</label>
        <input id="register-email" name="email" type="email" autoComplete="email" required />
        <label htmlFor="register-password">Contraseña</label>
        <input id="register-password" name="password" type="password" autoComplete="new-password" minLength={8} required />
        <button className="auth-submit" type="submit">Crear cuenta</button>
      </form>

      <div className="auth-divider"><span>o regístrate con</span></div>
      <form action={loginWithGoogle}>
        <button className="google-button" type="submit"><span aria-hidden="true">G</span>Google</button>
      </form>

      <p className="auth-switch">¿Ya tienes cuenta? <Link href="/login">Iniciar sesión</Link></p>
    </>
  );
}
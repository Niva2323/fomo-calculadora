type AuthMessageProps = {
  error?: string;
  notice?: string;
};

const errorMessages: Record<string, string> = {
  invalid: "Revisa los datos. La contraseña debe tener al menos 8 caracteres.",
  credentials: "No se pudo iniciar sesión. Comprueba el correo y la contraseña.",
  register: "No se pudo crear la cuenta. Comprueba los datos o intenta iniciar sesión.",
  google: "No se pudo completar el acceso con Google. Inténtalo de nuevo.",
};

const noticeMessages: Record<string, string> = {
  setup: "La autenticación aún no está configurada. Completa las variables de Supabase para continuar.",
  verify: "Cuenta creada. Revisa tu correo para confirmar la dirección antes de iniciar sesión.",
};

export function AuthMessage({ error, notice }: AuthMessageProps) {
  const message = error ? errorMessages[error] : notice ? noticeMessages[notice] : undefined;

  if (!message) {
    return null;
  }

  return (
    <p className={`auth-message ${error ? "is-error" : "is-notice"}`} role={error ? "alert" : "status"}>
      {message}
    </p>
  );
}
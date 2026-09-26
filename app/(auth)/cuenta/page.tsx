import { redirect } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  if (!getSupabaseConfig()) {
    redirect("/login?notice=setup");
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const fullName = user.user_metadata?.full_name;
  const displayName = typeof fullName === "string" && fullName.trim()
    ? fullName
    : user.email?.split("@")[0] || "Comandante";
  const createdAt = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(user.created_at));

  return (
    <>
      <p className="auth-eyebrow">PERFIL DE USUARIO</p>
      <h2>Hola, {displayName}.</h2>
      <p className="auth-description">Tu cuenta de FOMO WAR ROOM.</p>

      <dl className="profile-list">
        <div>
          <dt>Nombre</dt>
          <dd>{displayName}</dd>
        </div>
        <div>
          <dt>Correo electrónico</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt>Miembro desde</dt>
          <dd>{createdAt}</dd>
        </div>
      </dl>

      <form action={logout}>
        <button className="auth-submit profile-logout" type="submit">Cerrar sesión</button>
      </form>
    </>
  );
}
import type { ReactNode } from "react";
import Link from "next/link";
import "../auth.css";

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="auth-shell">
      <header className="auth-header">
        <Link className="auth-brand" href="/">
          <span className="brand-mark" aria-hidden="true">✦</span>
          <span>FOMO WAR ROOM</span>
        </Link>
        <Link className="auth-return" href="/">Volver al calculador</Link>
      </header>

      <div className="auth-grid">
        <aside className="auth-aside">
          <div>
            <p className="auth-eyebrow">FOMO · TEMPORADA 04</p>
            <h1>La estrategia empieza antes del combate.</h1>
          </div>
          <div className="auth-aside-footer">
            <span>WAR ROOM</span>
            <span>CLAN PLANNER</span>
          </div>
        </aside>
        <section className="auth-panel">{children}</section>
      </div>
    </main>
  );
}
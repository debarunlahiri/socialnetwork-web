import { AppHeader } from "./AppHeader";

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="app-page">
      <AppHeader />
      <section className="page-wrap">
        <header className="page-title">
          <p>{eyebrow}</p>
          <h1>{title}</h1>
          {description && <span>{description}</span>}
        </header>
        {children}
      </section>
    </main>
  );
}

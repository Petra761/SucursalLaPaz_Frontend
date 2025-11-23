import type { ReactNode } from "react";
import { Header } from "../components/organisms/Header";
import { Sidebar, type ViewType } from "../components/organisms/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
  currentView: ViewType; // Nuevo prop
  onNavigate: (view: ViewType) => void; // Nuevo prop
}

export function MainLayout({
  children,
  currentView,
  onNavigate,
}: MainLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden font-display">
      {/* Pasamos los props al Sidebar */}
      <Sidebar currentView={currentView} onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </div>
      </main>
    </div>
  );
}

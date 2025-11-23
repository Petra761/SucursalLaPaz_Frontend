import { BrandHeader } from "../molecules/BrandHeader";
import { NavItem } from "../molecules/NavItem";

export type ViewType = "dashboard" | "requests" | "reports" | "settings";

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  return (
    <aside className="flex w-64 flex-col border-r border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 flex-shrink-0 transition-all">
      <div className="flex h-full min-h-0 flex-col justify-between p-4">
        <div className="flex flex-col gap-4">
          <BrandHeader />

          <nav className="flex flex-col gap-2 mt-4">
            <NavItem
              icon="dashboard"
              label="Dashboard"
              isActive={currentView === "dashboard"}
              onClick={() => onNavigate("dashboard")}
            />
            <NavItem
              icon="bar_chart"
              label="Reportes"
              isActive={currentView === "reports"}
              onClick={() => onNavigate("reports")}
            />
            <NavItem
              icon="inbox"
              label="Solicitudes"
              isActive={currentView === "requests"}
              onClick={() => onNavigate("requests")}
            />
            <NavItem
              icon="settings"
              label="Configuración"
              isActive={currentView === "settings"}
              onClick={() => onNavigate("settings")}
            />
          </nav>
        </div>

        <div className="flex flex-col gap-1">
          <NavItem
            icon="help_outline"
            label="Ayuda"
            isActive={false}
            onClick={() => console.log("Ayuda clickeado")}
          />
        </div>
      </div>
    </aside>
  );
}

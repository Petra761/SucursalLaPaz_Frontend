import { BrandHeader } from "../molecules/BrandHeader";
import { NavItem } from "../molecules/NavItem";
import { NavGroup } from "../molecules/NavGroup";
import { SubNavItem } from "../molecules/SubNavItem";

export type ViewType =
  | "dashboard"
  | "requests"
  | "reports-operations"
  | "reports-performance"
  | "reports-finance"
  | "settings";

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const isReportsActive = currentView.startsWith("reports-");

  return (
    <aside className="flex w-64 flex-col border-r border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 flex-shrink-0 transition-all h-screen overflow-y-auto">
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

            <NavGroup
              icon="bar_chart"
              label="Reportes"
              activePath={isReportsActive}
            >
              <SubNavItem
                icon="engineering"
                label="Operaciones"
                isActive={currentView === "reports-operations"}
                onClick={() => onNavigate("reports-operations")}
              />
              <SubNavItem
                icon="speed"
                label="Rendimiento"
                isActive={currentView === "reports-performance"}
                onClick={() => onNavigate("reports-performance")}
              />
              <SubNavItem
                icon="payments"
                label="Finanzas"
                isActive={currentView === "reports-finance"}
                onClick={() => onNavigate("reports-finance")}
              />
            </NavGroup>

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
            onClick={() => console.log("Ayuda")}
          />
        </div>
      </div>
    </aside>
  );
}

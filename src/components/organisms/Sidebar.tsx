import { useLocation, useNavigate } from "react-router-dom";
import { BrandHeader } from "../molecules/BrandHeader";
import { NavItem } from "../molecules/NavItem";
import { NavGroup } from "../molecules/NavGroup";
import { SubNavItem } from "../molecules/SubNavItem";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  
  const isReportsActive = location.pathname.startsWith('/reports');

  return (
    <aside className="flex w-64 flex-col border-r border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 flex-shrink-0 transition-all h-screen overflow-y-auto">
      <div className="flex h-full min-h-0 flex-col justify-between p-4">
        
        <div className="flex flex-col gap-4">
          <BrandHeader />
          
          <nav className="flex flex-col gap-2 mt-4">
            <NavItem 
              icon="dashboard" 
              label="Dashboard" 
              isActive={isActive('/dashboard')}
              onClick={() => navigate('/dashboard')}
            />
            
            <NavGroup 
              icon="bar_chart" 
              label="Reportes" 
              activePath={isReportsActive}
            >
              <SubNavItem 
                icon="engineering"
                label="Operaciones"
                isActive={isActive('/reports/operations')}
                onClick={() => navigate('/reports/operations')}
              />
              <SubNavItem 
                icon="speed"
                label="Rendimiento"
                isActive={isActive('/reports/performance')}
                onClick={() => navigate('/reports/performance')}
              />
              <SubNavItem 
                icon="payments"
                label="Finanzas"
                isActive={isActive('/reports/finance')}
                onClick={() => navigate('/reports/finance')}
              />
            </NavGroup>

            <NavItem 
              icon="inbox" 
              label="Solicitudes" 
              isActive={isActive('/requests')}
              onClick={() => navigate('/requests')}
            />
            <NavItem 
              icon="settings" 
              label="Configuración" 
              isActive={isActive('/settings')}
              onClick={() => navigate('/settings')}
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
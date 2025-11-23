import { useState } from "react";
import { MainLayout } from "./layouts/MainLayout";
import { DashboardHome } from "./pages/DashboardHome";
import { RequestsPage } from "./pages/RequestsPage";
import type { ViewType } from "./components/organisms/Sidebar";

function App() {
  // 1. Estado para controlar qué vista se muestra.
  // Por defecto iniciamos en 'dashboard'.
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");

  // 2. Función helper para renderizar el contenido correcto
  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardHome />;
      case "requests":
        return <RequestsPage />;
      default:
        // Placeholder para páginas aún no creadas
        return (
          <div className="flex flex-col items-center justify-center h-96 text-gray-500">
            <span className="material-symbols-outlined text-6xl mb-4">
              construction
            </span>
            <h2 className="text-xl font-bold">En construcción</h2>
            <p>La vista {currentView} estará disponible pronto.</p>
          </div>
        );
    }
  };

  return (
    // 3. Pasamos el estado y la función de cambio al Layout
    <MainLayout currentView={currentView} onNavigate={setCurrentView}>
      {renderContent()}
    </MainLayout>
  );
}

export default App;

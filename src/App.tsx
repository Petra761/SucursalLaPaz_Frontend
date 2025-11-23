import { useState } from "react";
import { MainLayout } from "./layouts/MainLayout";
import { DashboardHome } from "./pages/DashboardHome";
import { RequestsPage } from "./pages/RequestsPage";
import { OperationsReport } from "./pages/OperationsReport";
import { PerformanceReport } from "./pages/PerformanceReport";
import { FinanceReport } from "./pages/FinanceReport";
import { type ViewType } from "./components/organisms/Sidebar";

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardHome />;
      case 'requests':
        return <RequestsPage />;
      
      case 'reports-operations':
        return <OperationsReport />;
      case 'reports-performance':
        return <PerformanceReport />;
      case 'reports-finance':
        return <FinanceReport />;
        
      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 text-gray-500">
            <span className="material-symbols-outlined text-6xl mb-4">construction</span>
            <h2 className="text-xl font-bold">En construcción</h2>
            <p>La vista {currentView} estará disponible pronto.</p>
          </div>
        );
    }
  };

  return (
    <MainLayout currentView={currentView} onNavigate={setCurrentView}>
      {renderContent()}
    </MainLayout>
  );
}

export default App;
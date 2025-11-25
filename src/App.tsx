import { Routes, Route, Navigate } from "react-router-dom"; // Importar componentes de ruta
import { MainLayout } from "./layouts/MainLayout";
import { DashboardHome } from "./pages/DashboardHome";
import { RequestsPage } from "./pages/RequestsPage";
import { OperationsReport } from "./pages/OperationsReport";
import { PerformanceReport } from "./pages/PerformanceReport";
import { FinanceReport } from "./pages/FinanceReport";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/requests" element={<RequestsPage />} />
        
        <Route path="/reports/operations" element={<OperationsReport />} />
        <Route path="/reports/performance" element={<PerformanceReport />} />
        <Route path="/reports/finance" element={<FinanceReport />} />
        
        <Route path="*" element={
          <div className="p-10 text-center">
            <h1 className="text-2xl font-bold">404 - Página no encontrada</h1>
          </div>
        } />
      </Routes>
    </MainLayout>
  );
}

export default App;
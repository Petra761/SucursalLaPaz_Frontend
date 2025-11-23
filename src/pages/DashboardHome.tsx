import { useState } from "react";
import { StatsGrid } from "../components/organisms/StatsGrid";
import { FinancialTrendsWidget } from "../components/organisms/FinancialTrendsWidget";
import { QuickReportsWidget } from "../components/organisms/QuickReportsWidget";
import { RequestsTableWidget } from "../components/organisms/RequestsTableWidget";
import { CreateRequestModal } from "../components/organisms/CreateRequestModal";
import { ToastNotification } from "../components/atoms/ToastNotification";

export function DashboardHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSuccess = () => {
    setShowToast(true);
  };

  return (
    <div className="flex flex-col gap-6 relative">
      
      <section>
        <StatsGrid />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 flex flex-col gap-6">
          <FinancialTrendsWidget />
          <QuickReportsWidget />
        </div>

        <div className="lg:col-span-1 h-full">
           <RequestsTableWidget onCreate={() => setIsModalOpen(true)} />
        </div>
        
      </section>

      <CreateRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <ToastNotification 
        isVisible={showToast}
        message="Solicitud creada desde el Dashboard."
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
import { StatsGrid } from "../components/organisms/StatsGrid";
import { FinancialTrendsWidget } from "../components/organisms/FinancialTrendsWidget";
import { QuickReportsWidget } from "../components/organisms/QuickReportsWidget";
import { RequestsTableWidget } from "../components/organisms/RequestsTableWidget";

export function DashboardHome() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <StatsGrid />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <FinancialTrendsWidget />
          <QuickReportsWidget />
        </div>

        <div className="lg:col-span-1 h-full overflow-x-hidden">
          <RequestsTableWidget />
        </div>
      </section>
    </div>
  );
}

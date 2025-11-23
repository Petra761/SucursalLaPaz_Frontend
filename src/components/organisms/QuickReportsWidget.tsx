import { QuickActionCard } from "../molecules/QuickActionCard";

export function QuickReportsWidget() {
  return (
    <div className="rounded-xl border border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 p-6 h-full">
      <h2 className="text-dark-gray dark:text-gray-100 text-lg font-bold mb-4">
        Reportes Rápidos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <QuickActionCard
          icon="receipt_long"
          title="Reporte de Ventas"
          color="blue"
        />
        <QuickActionCard
          icon="shopping_cart"
          title="Reporte de Gastos"
          color="red"
        />
        <QuickActionCard
          icon="account_balance"
          title="Balance General"
          color="green"
        />
      </div>
    </div>
  );
}

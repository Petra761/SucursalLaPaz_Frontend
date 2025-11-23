import { StaticChartSvg } from "../atoms/StaticChartSvg";

export function FinancialTrendsWidget() {
  return (
    <div className="rounded-xl border border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-dark-gray dark:text-gray-100 text-lg font-bold">
          Tendencias Financieras
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 dark:text-gray-400 text-sm hidden sm:block">
            Últimos 30 días
          </span>
          <button className="flex items-center justify-center h-8 px-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined text-base mr-1">
              expand_more
            </span>
            Filtro
          </button>
        </div>
      </div>

      <StaticChartSvg />
    </div>
  );
}

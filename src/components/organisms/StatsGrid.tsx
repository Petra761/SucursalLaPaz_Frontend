import { StatCard } from "../molecules/StatCard";

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Ventas Totales"
        value="$120,500"
        trendText="+5.2%"
        trendIcon="trending_up"
        trendColor="green"
      />

      <StatCard
        title="Gastos Totales"
        value="$45,200"
        trendText="+8.1%"
        trendIcon="trending_down"
        trendColor="red"
      />

      <StatCard
        title="Ganancias"
        value="$75,300"
        trendText="+4.3%"
        trendIcon="trending_up"
        trendColor="green"
      />

      <StatCard
        title="Solicitudes Pendientes"
        value="15"
        trendText="+3"
        trendIcon="arrow_upward"
        trendColor="orange"
      />
    </div>
  );
}

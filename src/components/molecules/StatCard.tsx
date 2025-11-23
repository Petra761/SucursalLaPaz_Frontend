interface StatCardProps {
  title: string;
  value: string;
  trendText: string;
  trendIcon: string;
  trendColor: "green" | "red" | "orange";
}

export function StatCard({
  title,
  value,
  trendText,
  trendIcon,
  trendColor,
}: StatCardProps) {
  const colorMap = {
    green: "text-accent-green",
    red: "text-accent-red",
    orange: "text-accent-orange",
  };

  const activeColorClass = colorMap[trendColor];

  return (
    <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-900 border border-border-color-light dark:border-border-color-dark shadow-sm">
      <p className="text-dark-gray dark:text-gray-200 text-base font-medium leading-normal">
        {title}
      </p>

      <p className="text-dark-gray dark:text-gray-100 tracking-light text-3xl font-bold leading-tight">
        {value}
      </p>

      <div className="flex items-center gap-1">
        <span
          className={`material-symbols-outlined text-lg ${activeColorClass}`}
        >
          {trendIcon}
        </span>
        <p className={`text-sm font-medium leading-normal ${activeColorClass}`}>
          {trendText}
        </p>
      </div>
    </div>
  );
}

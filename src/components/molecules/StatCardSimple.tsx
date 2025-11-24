interface StatCardSimpleProps {
  icon: string;
  title: string;
  value: string;
  subtext: string;
}

export function StatCardSimple({ icon, title, value, subtext }: StatCardSimpleProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-900 border border-border-color-light dark:border-border-color-dark shadow-sm">
      <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
        <span className="material-symbols-outlined">{icon}</span>
        <p className="text-sm font-medium">{title}</p>
      </div>
      <p className="text-dark-gray dark:text-gray-100 tracking-light text-2xl font-bold leading-tight">
        {value}
      </p>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        {subtext}
      </p>
    </div>
  );
}
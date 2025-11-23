interface QuickActionCardProps {
  icon: string;
  title: string;
  color: "blue" | "red" | "green";
}

export function QuickActionCard({ icon, title, color }: QuickActionCardProps) {
  const colorStyles = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/50",
      text: "text-blue-500 dark:text-blue-400",
    },
    red: {
      bg: "bg-red-100 dark:bg-red-900/50",
      text: "text-red-500 dark:text-red-400",
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/50",
      text: "text-green-500 dark:text-green-400",
    },
  };

  const styles = colorStyles[color];

  return (
    <button className="group flex items-center gap-3 p-4 rounded-lg border border-border-color-light dark:border-border-color-dark hover:border-primary dark:hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all w-full text-left">
      <div
        className={`flex items-center justify-center size-10 rounded-full ${styles.bg} ${styles.text}`}
      >
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <p className="text-dark-gray dark:text-gray-200 text-sm font-medium">
        {title}
      </p>
    </button>
  );
}

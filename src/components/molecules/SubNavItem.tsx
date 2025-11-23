interface SubNavItemProps {
  label: string;
  icon?: string;
  isActive?: boolean;
  onClick: () => void;
}

export function SubNavItem({
  label,
  icon,
  isActive,
  onClick,
}: SubNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 py-2 px-3 rounded-lg text-sm font-medium w-full text-left transition-colors ${
        isActive
          ? "text-primary dark:text-white bg-primary/10 dark:bg-primary/20 font-semibold"
          : "text-gray-500 dark:text-gray-400 hover:text-dark-gray dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      {icon ? (
        <span
          className={`material-symbols-outlined text-[20px] ${
            isActive
              ? "text-primary dark:text-white"
              : "text-gray-400 dark:text-gray-500"
          }`}
        >
          {icon}
        </span>
      ) : (
        <span
          className={`size-1.5 rounded-full ${
            isActive ? "bg-primary" : "bg-gray-400"
          }`}
        ></span>
      )}

      {label}
    </button>
  );
}

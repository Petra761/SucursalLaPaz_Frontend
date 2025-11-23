interface NavItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export function NavItem({
  icon,
  label,
  isActive = false,
  onClick,
}: NavItemProps) {
  const baseClasses =
    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left";
  const activeClasses =
    "bg-primary/20 dark:bg-primary/30 text-primary dark:text-white font-semibold";
  const inactiveClasses =
    "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <p className="text-sm leading-normal">{label}</p>
    </button>
  );
}

import { useState, type ReactNode } from "react";

interface NavGroupProps {
  icon: string;
  label: string;
  children: ReactNode;
  activePath?: boolean;
}

export function NavGroup({
  icon,
  label,
  children,
  activePath = false,
}: NavGroupProps) {
  const [localOpen, setLocalOpen] = useState(false);

  const isOpen = localOpen || activePath;

  return (
    <div>
      <button
        type="button"
        onClick={() => setLocalOpen((prev) => !prev)}
        className={`flex items-center justify-between w-full gap-3 px-3 py-2 rounded-lg transition-colors ${
          activePath
            ? "text-dark-gray dark:text-white font-semibold bg-gray-50 dark:bg-gray-800"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`material-symbols-outlined ${
              activePath ? "text-primary" : ""
            }`}
          >
            {icon}
          </span>
          <p className="text-sm font-medium leading-normal">{label}</p>
        </div>
        <span
          className={`material-symbols-outlined transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-4 border-l-2 border-gray-100 dark:border-gray-800 ml-4 space-y-1 my-1">
          {children}
        </div>
      </div>
    </div>
  );
}

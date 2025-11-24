import { useState } from "react";

interface EmployeeActionMenuProps {
  onViewDetail: () => void;
  onViewReports: () => void;
}

export function EmployeeActionMenu({ onViewDetail, onViewReports }: EmployeeActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)} 
        className={`p-1 rounded-full transition-colors ${
          isOpen 
            ? "bg-gray-100 dark:bg-gray-800 text-primary" 
            : "text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        <span className="material-symbols-outlined">more_vert</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 border border-border-color-light dark:border-border-color-dark rounded-lg shadow-lg z-20 py-1 animate-in fade-in zoom-in-95 duration-100">
          
          <button
            onClick={onViewReports}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
          >
            <span className="material-symbols-outlined text-lg">bar_chart</span>
            Ver Reportes de Empleado
          </button>

          <button
            onClick={onViewDetail}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
          >
            <span className="material-symbols-outlined text-lg">person</span>
            Ver Detalle del Empleado
          </button>
          
        </div>
      )}
    </div>
  );
}
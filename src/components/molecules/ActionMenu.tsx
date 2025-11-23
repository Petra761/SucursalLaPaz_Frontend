import { useState, useRef, useEffect } from "react";

interface ActionMenuProps {
  onViewDetail: () => void;
  onDelete: () => void;
}

export function ActionMenu({ onViewDetail, onDelete }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleView = () => {
    setIsOpen(false);
    onViewDetail();
  };

  const handleDelete = () => {
    setIsOpen(false);
    onDelete();
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-1 rounded-full transition-colors ${
          isOpen
            ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        <span className="material-symbols-outlined">more_vert</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-900 border border-border-color-light dark:border-border-color-dark rounded-lg shadow-xl z-50 p-1 animate-in fade-in zoom-in-95 duration-100">
          <button
            onClick={handleView}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md w-full text-left transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              visibility
            </span>
            Ver detalle
          </button>

          <div className="h-px bg-border-color-light dark:bg-border-color-dark my-1"></div>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md w-full text-left transition-colors"
          >
            <span className="material-symbols-outlined text-base">delete</span>
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

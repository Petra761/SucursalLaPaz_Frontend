import { useEffect } from "react";

interface ToastNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function ToastNotification({ message, isVisible, onClose }: ToastNotificationProps) {
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60] animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl bg-white dark:bg-gray-800 border-l-4 border-green-500">
        <div className="flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50 p-1">
          <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xl">
            check
          </span>
        </div>
        
        <div className="flex flex-col">
          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
            ¡Operación Exitosa!
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {message}
          </p>
        </div>

        <button 
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
    </div>
  );
}
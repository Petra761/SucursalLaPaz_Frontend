import { useState } from "react";

export type ActionType = "approve" | "reject" | "delete";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (justification?: string) => void;
  actionType: ActionType;
  isSubmitting: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  actionType,
  isSubmitting,
}: ConfirmationModalProps) {
  const [justification, setJustification] = useState("");

  if (!isOpen) return null;

  const config = {
    approve: {
      title: "Confirmar Aprobación",
      description:
        "¿Estás seguro de aprobar esta solicitud? El estado cambiará a 'Aprobado'.",
      confirmText: "Aprobar",
      colorClass: "bg-primary hover:bg-primary/90",
      icon: "check_circle",
      iconColor: "text-primary",
      requireJustification: false,
    },
    reject: {
      title: "Confirmar Rechazo",
      description: "¿Estás seguro de rechazar esta solicitud?",
      confirmText: "Rechazar",
      colorClass: "bg-accent-orange hover:bg-yellow-600",
      icon: "block",
      iconColor: "text-accent-orange",
      requireJustification: true,
    },
    delete: {
      title: "Eliminar Solicitud",
      description:
        "¿Estás seguro de eliminar esta solicitud permanentemente? Esta acción no se puede deshacer.",
      confirmText: "Eliminar",
      colorClass: "bg-red-600 hover:bg-red-700",
      icon: "warning",
      iconColor: "text-red-600",
      requireJustification: false,
    },
  };

  const currentConfig = config[actionType];
  const isConfirmDisabled =
    currentConfig.requireJustification && !justification.trim();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">

      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-border-color-light dark:border-border-color-dark rounded-xl shadow-2xl overflow-hidden scale-100">
        <div className="p-6">
          <div className="flex gap-4">
            <div
              className={`flex-shrink-0 flex items-center justify-center size-12 rounded-full bg-gray-100 dark:bg-gray-800 ${currentConfig.iconColor}`}
            >
              <span className="material-symbols-outlined text-2xl">
                {currentConfig.icon}
              </span>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <h2 className="text-xl font-bold text-dark-gray dark:text-gray-100">
                {currentConfig.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {currentConfig.description}
              </p>

              {currentConfig.requireJustification && (
                <div className="flex flex-col gap-2 mt-2">
                  <label
                    htmlFor="justification"
                    className="text-sm font-bold text-dark-gray dark:text-gray-300"
                  >
                    Justificación (Obligatoria){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="justification"
                    rows={3}
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    placeholder="Escriba el motivo..."
                    className="w-full p-3 rounded-lg border border-border-color-light dark:border-border-color-dark bg-gray-50 dark:bg-gray-800 text-dark-gray dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-400 resize-none"
                    autoFocus
                  ></textarea>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-border-color-light dark:border-border-color-dark">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 h-10 rounded-lg bg-white dark:bg-gray-800 border border-border-color-light dark:border-border-color-dark text-gray-700 dark:text-gray-300 text-sm font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(justification)}
            disabled={isSubmitting || isConfirmDisabled}
            className={`px-4 h-10 rounded-lg text-white text-sm font-bold transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${currentConfig.colorClass}`}
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-base">
                  progress_activity
                </span>
                Procesando...
              </>
            ) : (
              currentConfig.confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

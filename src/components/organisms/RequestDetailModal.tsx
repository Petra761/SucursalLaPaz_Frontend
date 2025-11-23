import { useState } from "react";
import type { RequestFrontend } from "../../types/request.types";
import { StatusBadge } from "../atoms/StatusBadge";
import {
  updateRequestStatus,
  deleteRequest,
} from "../../services/request.service";
import { ConfirmationModal, type ActionType } from "./ConfirmationModal";

interface RequestDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: RequestFrontend | null;
  onSuccess: () => void;
}

export function RequestDetailModal({
  isOpen,
  onClose,
  request,
  onSuccess,
}: RequestDetailModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<ActionType>("approve");

  if (!isOpen || !request) return null;

  const isActionDisabled = request.status !== "Pendiente";

  const handleOpenApprove = () => {
    setCurrentAction("approve");
    setIsConfirmOpen(true);
  };

  const handleOpenReject = () => {
    setCurrentAction("reject");
    setIsConfirmOpen(true);
  };

  const handleOpenDelete = () => {
    setCurrentAction("delete");
    setIsConfirmOpen(true);
  };

  const handleFinalConfirm = async (justification?: string) => {
    try {
      setIsSubmitting(true);

      if (currentAction === "approve") {
        await updateRequestStatus(request.id, "Aprobada");
      } else if (currentAction === "reject") {
        await updateRequestStatus(request.id, "Rechazada", justification);
      } else if (currentAction === "delete") {
        await deleteRequest(request.id);
      }

      setIsConfirmOpen(false);
      onSuccess();
      onClose();
    } catch {
      alert("Ocurrió un error al procesar la solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
        <div className="w-full max-w-2xl h-full bg-white dark:bg-gray-900 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between p-6 border-b border-border-color-light dark:border-border-color-dark">
            <h2 className="text-xl font-bold text-dark-gray dark:text-gray-100">
              Detalle de la Solicitud
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Código
                </label>
                <p className="text-base font-medium text-primary">
                  {request.id}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Solicitante
                </label>
                <p className="text-base text-dark-gray dark:text-gray-100">
                  {request.requester}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Estado
                </label>
                <div>
                  <StatusBadge status={request.status} />
                </div>
              </div>
              <div className="flex flex-col gap-1 col-span-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Asunto
                </label>
                <p className="text-lg font-semibold text-dark-gray dark:text-gray-100">
                  {request.subject}
                </p>
              </div>
            </div>

            <hr className="my-6 border-border-color-light dark:border-border-color-dark" />

            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Descripción
                </label>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {request.description || "Sin descripción detallada."}
                </div>
              </div>

              {request.status === "Rechazado" && (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-red-500 dark:text-red-400">
                    Justificación del Rechazo
                  </label>
                  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-base text-gray-700 dark:text-gray-300 border border-red-100 dark:border-red-900/30">
                    {request.rejectionReason || "Sin justificación registrada."}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* FOOTER DE ACCIONES */}
          <div className="flex flex-wrap items-center justify-end gap-3 p-6 border-t border-border-color-light dark:border-border-color-dark bg-gray-50 dark:bg-gray-900/50">
            <button
              onClick={onClose}
              className="px-4 h-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cerrar
            </button>

            <div className="flex-1"></div>

            <button
              onClick={handleOpenDelete}
              className="flex items-center gap-2 px-4 h-10 rounded-lg border border-red-500 text-red-600 dark:text-red-400 text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">delete</span>
              Eliminar
            </button>

            <button
              onClick={handleOpenReject}
              disabled={isActionDisabled}
              className="flex items-center gap-2 px-4 h-10 rounded-lg bg-accent-orange text-white text-sm font-bold hover:bg-yellow-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-lg">block</span>
              Rechazar
            </button>

            <button
              onClick={handleOpenApprove}
              disabled={isActionDisabled}
              className="flex items-center gap-2 px-4 h-10 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-lg">check</span>
              Aprobar
            </button>
          </div>
        </div>
      </div>

      {isConfirmOpen && (
        <ConfirmationModal
          isOpen={true}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleFinalConfirm}
          actionType={currentAction}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}

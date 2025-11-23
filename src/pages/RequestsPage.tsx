import { useState } from "react";
import { RequestsToolbar } from "../components/molecules/RequestsToolbar";
import { RequestsTable } from "../components/organisms/RequestsTable";
import { CreateRequestModal } from "../components/organisms/CreateRequestModal";
import { RequestDetailModal } from "../components/organisms/RequestDetailModal";
import { ToastNotification } from "../components/atoms/ToastNotification";
import { useRequests } from "../hooks/useRequests";
import { type RequestFrontend } from "../types/request.types";
import { ConfirmationModal } from "../components/organisms/ConfirmationModal";
import { deleteRequest } from "../services/request.service";

export function RequestsPage() {
  const { requests, loading, error, refresh } = useRequests();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<RequestFrontend | null>(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isSubmittingDelete, setIsSubmittingDelete] = useState(false);

  const [showToast, setShowToast] = useState(false);

  const handleSuccess = () => {
    refresh();
    setShowToast(true);
  };

  const handleOpenDetail = (request: RequestFrontend) => {
    setSelectedRequest(request);
    setIsDetailModalOpen(true);
  };

  const handleDeleteClick = (request: RequestFrontend) => {
    setItemToDelete(request.id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      setIsSubmittingDelete(true);
      await deleteRequest(itemToDelete);

      setIsConfirmOpen(false);
      handleSuccess();
    } catch {
      alert("Error al eliminar");
    } finally {
      setIsSubmittingDelete(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <div className="flex flex-wrap justify-between gap-4 items-center mb-4">
        <h1 className="text-dark-gray dark:text-gray-100 text-3xl font-black leading-tight">
          Solicitudes
        </h1>
      </div>

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      <RequestsToolbar onCreateClick={() => setIsCreateModalOpen(true)} />

      <RequestsTable
        data={requests}
        isLoading={loading}
        onViewDetail={handleOpenDetail}
        onDelete={handleDeleteClick}
      />


      <CreateRequestModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <RequestDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        request={selectedRequest}
        onSuccess={handleSuccess}
      />

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        actionType="delete"
        isSubmitting={isSubmittingDelete}
      />

      <ToastNotification
        isVisible={showToast}
        message="Operación realizada con éxito."
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

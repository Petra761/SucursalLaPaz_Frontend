import { useState } from "react";
import type { CreateRequestPayload } from "../../types/request.types";
import { createRequest } from "../../services/request.service";

interface CreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateRequestModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateRequestModalProps) {
  const initialFormState: CreateRequestPayload = {
    codSolicitante: "EMP-001",
    codDestino: "",
    tipoSolicitud: "",
    asunto: "",
    descripcion: "",
    prioridad: "",
  };

  const [formData, setFormData] =
    useState<CreateRequestPayload>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!formData.asunto || !formData.codDestino || !formData.prioridad) {
      setError("Por favor completa los campos obligatorios.");
      setIsSubmitting(false);
      return;
    }

    try {
      await createRequest(formData);
      setFormData(initialFormState);
      onSuccess();
      onClose();
    } catch {
      setError("Error al crear la solicitud. Intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-2xl h-full bg-white dark:bg-gray-900 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-border-color-light dark:border-border-color-dark">
          <h2 className="text-2xl font-bold text-dark-gray dark:text-gray-100">
            Crear Nueva Solicitud
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* Mensaje de Error */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded relative text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Solicitante */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Solicitante
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  person
                </span>
                <input
                  type="text"
                  readOnly
                  value={formData.codSolicitante}
                  className="w-full pl-10 h-10 rounded-lg border border-border-color-light dark:border-border-color-dark bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 focus:outline-none cursor-not-allowed"
                />
              </div>
            </div>

            {/* Destino (Select) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Destino
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  folder_shared
                </span>
                <select
                  name="codDestino"
                  value={formData.codDestino}
                  onChange={handleChange}
                  className="w-full pl-10 h-10 rounded-lg border border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 text-dark-gray dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:outline-none appearance-none"
                  required
                >
                  <option value="" disabled>
                    Seleccionar destino
                  </option>
                  <option value="DEPTO-IT">Tecnología (IT)</option>
                  <option value="DEPTO-RRHH">Recursos Humanos</option>
                  <option value="DEPTO-MKT">Marketing</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipo (Select) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Tipo
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  category
                </span>
                <select
                  name="tipoSolicitud"
                  value={formData.tipoSolicitud}
                  onChange={handleChange}
                  className="w-full pl-10 h-10 rounded-lg border border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 text-dark-gray dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:outline-none appearance-none"
                  required
                >
                  <option value="" disabled>
                    Seleccionar tipo
                  </option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Acceso">Acceso</option>
                  <option value="Vacaciones">Vacaciones</option>
                </select>
              </div>
            </div>

            {/* Prioridad (Select) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Prioridad
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  flag
                </span>
                <select
                  name="prioridad"
                  value={formData.prioridad}
                  onChange={handleChange}
                  className="w-full pl-10 h-10 rounded-lg border border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 text-dark-gray dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:outline-none appearance-none"
                  required
                >
                  <option value="" disabled>
                    Seleccionar prioridad
                  </option>
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                  <option value="Critica">Crítica</option>
                </select>
              </div>
            </div>
          </div>

          {/* Asunto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Asunto
            </label>
            <input
              type="text"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              placeholder="Ej: Solicitud de vacaciones"
              className="w-full px-4 h-10 rounded-lg border border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 text-dark-gray dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:outline-none"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={6}
              placeholder="Detalle de la solicitud..."
              className="w-full p-4 rounded-lg border border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 text-dark-gray dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:outline-none resize-none"
            ></textarea>
          </div>

          {/* FOOTER DENTRO DEL FORM PARA USAR TYPE="SUBMIT" */}
          <div className="flex justify-end items-center gap-4 pt-6 mt-6 border-t border-border-color-light dark:border-border-color-dark">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 h-10 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 flex items-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">
                    progress_activity
                  </span>
                  Guardando...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">
                    save
                  </span>
                  Crear Solicitud
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

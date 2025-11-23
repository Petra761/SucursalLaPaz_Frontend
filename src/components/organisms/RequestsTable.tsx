import type { RequestFrontend } from "../../types/request.types";
import { StatusBadge } from "../atoms/StatusBadge";
import { ActionMenu } from "../molecules/ActionMenu";

interface RequestsTableProps {
  data: RequestFrontend[];
  isLoading: boolean;
  onViewDetail?: (request: RequestFrontend) => void;
  onDelete?: (request: RequestFrontend) => void;
}

export function RequestsTable({
  data,
  isLoading,
  onViewDetail,
  onDelete,
}: RequestsTableProps) {
  if (isLoading) {
    return (
      <div className="p-10 text-center text-gray-500 bg-white dark:bg-gray-900 rounded-xl border border-border-color-light dark:border-border-color-dark">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined animate-spin text-3xl text-primary">
            progress_activity
          </span>
          <p>Cargando solicitudes...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500 bg-white dark:bg-gray-900 rounded-xl border border-border-color-light dark:border-border-color-dark">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-600">
            inbox
          </span>
          <p>No hay solicitudes registradas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr className="text-gray-500 dark:text-gray-400 border-b border-border-color-light dark:border-border-color-dark">
              <th className="px-4 py-3 font-medium">Código</th>
              <th className="px-4 py-3 font-medium">Solicitante</th>
              <th className="px-4 py-3 font-medium">Destino</th>
              <th className="px-4 py-3 font-medium">Tipo</th>
              <th className="px-4 py-3 font-medium">Asunto</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">
                <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                  Fecha
                  <span className="material-symbols-outlined text-base">
                    arrow_downward
                  </span>
                </div>
              </th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color-light dark:divide-border-color-dark text-dark-gray dark:text-gray-200">
            {data.map((req) => (
              <tr
                key={req.id}
                className="group hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-primary">{req.id}</td>
                <td className="px-4 py-3">{req.requester}</td>
                <td className="px-4 py-3">{req.destination}</td>
                <td className="px-4 py-3">{req.type}</td>
                <td
                  className="px-4 py-3 font-medium max-w-[200px] truncate"
                  title={req.subject}
                >
                  {req.subject}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={req.status} />
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  {req.date}
                </td>

                <td className="px-4 py-3 text-right overflow-visible">
                  <ActionMenu
                    onViewDetail={() => onViewDetail && onViewDetail(req)}
                    onDelete={() => onDelete && onDelete(req)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-4 border-t border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Mostrando{" "}
          <span className="font-medium text-dark-gray dark:text-white">
            {data.length}
          </span>{" "}
          resultados
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled
            className="flex items-center justify-center size-8 rounded-lg border border-border-color-light dark:border-border-color-dark text-gray-400 cursor-not-allowed bg-gray-50 dark:bg-gray-800"
          >
            <span className="material-symbols-outlined text-lg">
              chevron_left
            </span>
          </button>
          <button className="flex items-center justify-center size-8 rounded-lg border border-border-color-light dark:border-border-color-dark text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-lg">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

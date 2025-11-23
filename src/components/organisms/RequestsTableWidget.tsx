import { type RequestStatus, StatusBadge } from "../atoms/StatusBadge";

interface RequestItem {
  code: string;
  subject: string;
  status: RequestStatus;
}

export function RequestsTableWidget() {
  const requests: RequestItem[] = [
    { code: "#8329", subject: "Reembolso", status: "Aprobado" },
    { code: "#8328", subject: "Compra de material", status: "Pendiente" },
    { code: "#8327", subject: "Viaje de negocios", status: "Aprobado" },
    { code: "#8326", subject: "Suscripción software", status: "Rechazado" },
    { code: "#8325", subject: "Reparación equipo", status: "Pendiente" },
  ];

  return (
    <div className="rounded-xl border border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-dark-gray dark:text-gray-100 text-lg font-bold">
          Solicitudes Recientes
        </h2>
        <button className="flex items-center justify-center h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold gap-2 hover:bg-primary/90 transition-colors">
          <span className="material-symbols-outlined text-xl">add</span>
          <span className="hidden sm:inline">Crear Nueva</span>
        </button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400 border-b border-border-color-light dark:border-border-color-dark">
              <th className="py-3 px-2 font-medium">Código</th>
              <th className="py-3 px-2 font-medium">Asunto</th>
              <th className="py-3 px-2 font-medium text-right sm:text-left">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color-light dark:divide-border-color-dark text-dark-gray dark:text-gray-200">
            {requests.map((req) => (
              <tr
                key={req.code}
                className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-3 px-2 font-medium text-gray-600 dark:text-gray-300">
                  {req.code}
                </td>
                <td className="py-3 px-2">{req.subject}</td>
                <td className="py-3 px-2 text-right sm:text-left">
                  <StatusBadge status={req.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

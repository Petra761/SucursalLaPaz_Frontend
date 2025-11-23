export type RequestStatus = "Aprobado" | "Pendiente" | "Rechazado";

interface StatusBadgeProps {
  status: RequestStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    Aprobado:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Pendiente:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Rechazado: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

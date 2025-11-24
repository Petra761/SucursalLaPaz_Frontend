import { type Employee } from "../../types/employee.types";
import { EmployeeActionMenu } from "../molecules/EmployeeActionMenu";

interface EmployeeTableProps {
  data: Employee[];
  onViewDetail: (employee: Employee) => void;
  onViewReports: (employee: Employee) => void;
}

export function EmployeeTable({
  data,
  onViewDetail,
  onViewReports,
}: EmployeeTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr className="text-gray-500 dark:text-gray-400 border-b border-border-color-light dark:border-border-color-dark">
            <th className="py-3 px-4 font-medium">Código</th>
            <th className="py-3 px-4 font-medium">Sucursal</th>
            <th className="py-3 px-4 font-medium">Puesto</th>
            <th className="py-3 px-4 font-medium">Departamento/Empresa</th>
            <th className="py-3 px-4 font-medium">Estado</th>
            <th className="py-3 px-4 font-medium text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-color-light dark:divide-border-color-dark text-dark-gray dark:text-gray-200">
          {data.map((emp) => (
            <tr
              key={emp.codigo}
              className="group hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
            >
              <td className="py-3 px-4 font-mono text-primary font-medium">
                {emp.codigo}
              </td>
              <td className="py-3 px-4 font-medium">{emp.sucursal}</td>
              <td className="py-3 px-4">{emp.puesto}</td>
              <td className="py-3 px-4">{emp.departamento}</td>
              <td className="py-3 px-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                  {emp.estado}
                </span>
              </td>
              <td className="py-3 px-4 text-right overflow-visible">
                <EmployeeActionMenu
                  onViewDetail={() => onViewDetail(emp)}
                  onViewReports={() => onViewReports(emp)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

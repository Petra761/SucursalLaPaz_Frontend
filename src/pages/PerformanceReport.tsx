import type { Employee } from "../types/employee.types";
import { EmployeeTable } from "../components/organisms/EmployeeTable";

export function PerformanceReport() {
  const employees: Employee[] = [
    {
      codigo: "EMP-001",
      sucursal: "Sede Central",
      puesto: "Gerente de Proyectos",
      departamento: "Desarrollo de Software",
      estado: "Activo",
      fechaIngreso: "2020-05-15"
    },
    {
      codigo: "EMP-002",
      sucursal: "Sucursal Norte",
      puesto: "Diseñador UX/UI Senior",
      departamento: "Diseño",
      estado: "Activo",
      fechaIngreso: "2021-03-10"
    },
    {
      codigo: "EMP-003",
      sucursal: "Sede Central",
      puesto: "Desarrollador Backend",
      departamento: "Desarrollo de Software",
      estado: "Vacaciones",
      fechaIngreso: "2022-08-01"
    },
    {
      codigo: "EMP-004",
      sucursal: "Sucursal Sur",
      puesto: "Analista de Marketing",
      departamento: "Marketing Digital",
      estado: "Activo",
      fechaIngreso: "2023-01-20"
    },
    {
      codigo: "EMP-005",
      sucursal: "Sede Central",
      puesto: "Soporte Técnico Nivel 2",
      departamento: "Soporte y Mantenimiento",
      estado: "Activo",
      fechaIngreso: "2019-11-05"
    }
  ];

  const handleViewDetail = (emp: Employee) => {
    alert(`Ver Detalle de: ${emp.codigo} - ${emp.puesto}`);
  };

  const handleViewReports = (emp: Employee) => {
    alert(`Ver Reportes de Rendimiento de: ${emp.codigo}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap justify-between gap-4 items-center">
        <h1 className="text-dark-gray dark:text-gray-100 text-3xl font-black leading-tight">
          Reportes de Rendimiento
        </h1>
      </div>

      <div className="rounded-xl border border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900">
        
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-border-color-light dark:border-border-color-dark">
          <h3 className="text-dark-gray dark:text-gray-100 text-lg font-bold">
            Lista de Empleados
          </h3>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="relative flex items-center w-full sm:w-auto flex-1">
              <span className="material-symbols-outlined absolute left-3 text-gray-500">search</span>
              <input 
                type="search"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-dark-gray dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 h-10 placeholder:text-gray-500 pl-10 pr-4 text-sm font-normal leading-normal"
                placeholder="Buscar por código o sucursal..."
              />
            </label>
            
            <button className="flex items-center gap-2 justify-center whitespace-nowrap rounded-lg border border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 px-4 h-10 text-sm font-medium text-dark-gray dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="material-symbols-outlined text-base">filter_list</span>
              <span>Filtrar</span>
            </button>
          </div>
        </div>

        <EmployeeTable 
          data={employees} 
          onViewDetail={handleViewDetail}
          onViewReports={handleViewReports}
        />
        
      </div>
    </div>
  );
}
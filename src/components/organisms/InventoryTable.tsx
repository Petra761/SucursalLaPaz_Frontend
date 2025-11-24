import { useState } from "react";
import type { Product } from "../../types/product.types";

interface InventoryTableProps {
  data: Product[];
  isLoading: boolean;
  onViewDetail: (product: Product) => void;
}

export function InventoryTable({
  data,
  isLoading,
  onViewDetail,
}: InventoryTableProps) {
  return (
    <div className="rounded-xl border border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-border-color-light dark:border-border-color-dark">
        <h3 className="text-dark-gray dark:text-gray-100 text-lg font-bold">
          Inventario de Productos
        </h3>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="relative flex items-center w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-3 text-gray-500">
              search
            </span>
            <input
              type="search"
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-dark-gray dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 h-10 placeholder:text-gray-500 pl-10 pr-4 text-sm font-normal leading-normal"
              placeholder="Buscar producto..."
            />
          </label>

          <button className="flex items-center gap-2 justify-center whitespace-nowrap rounded-lg border border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 px-4 h-10 text-sm font-medium text-dark-gray dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-base">
              filter_list
            </span>
            <span>Filtrar</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400 border-b border-border-color-light dark:border-border-color-dark bg-gray-50 dark:bg-gray-800/50">
              <th className="py-3 px-4 font-medium">Código</th>
              <th className="py-3 px-4 font-medium">Nombre</th>
              <th className="py-3 px-4 font-medium">Unidad de Medida</th>
              <th className="py-3 px-4 font-medium">Precio</th>
              <th className="py-3 px-4 font-medium">Marca</th>
              <th className="py-3 px-4 font-medium text-right"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border-color-light dark:divide-border-color-dark text-dark-gray dark:text-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined animate-spin text-3xl text-primary">
                      progress_activity
                    </span>
                    <p>Cargando inventario...</p>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-500">
                  No hay productos disponibles.
                </td>
              </tr>
            ) : (
              data.map((product) => (
                <tr
                  key={product.codigo}
                  className="group hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400 font-mono">
                    {product.codigo}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-100">
                    {product.nombre}
                  </td>
                  <td className="py-3 px-4">{product.unidadMedida}</td>
                  <td className="py-3 px-4">Bs. {product.precio.toFixed(2)}</td>
                  <td className="py-3 px-4">{product.marca}</td>

                  <td className="py-3 px-4 text-right overflow-visible">
                    <SimpleMenu onAction={() => onViewDetail(product)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SimpleMenu({ onAction }: { onAction: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
      >
        <span className="material-symbols-outlined">more_vert</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-900 border border-border-color-light dark:border-border-color-dark rounded-lg shadow-xl z-50 p-1 animate-in fade-in zoom-in-95 duration-100">
          <button
            onClick={onAction}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md w-full text-left transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              visibility
            </span>
            Ver detalle
          </button>
        </div>
      )}
    </div>
  );
}

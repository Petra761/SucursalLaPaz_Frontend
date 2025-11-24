import { useState } from "react";

export interface Product {
  codigo: string;
  nombre: string;
  descripcion: string;
  unidadMedida: string;
  precio: number;
  marca: string;
}

interface InventoryTableProps {
  onViewDetail: (product: Product) => void;
}

export function InventoryTable({ onViewDetail }: InventoryTableProps) {
  const products: Product[] = [
    {
      codigo: "0001",
      nombre: "Yogurt Griego",
      descripcion: "Yogurt griego con un poco de salsa de maracuya",
      unidadMedida: "Mililitros",
      precio: 5.0,
      marca: "Pil",
    },
    {
      codigo: "0002",
      nombre: "Leche Entera UHT",
      descripcion: "Leche entera de larga vida en bolsa",
      unidadMedida: "Litro",
      precio: 6.5,
      marca: "Pil",
    },
    {
      codigo: "0003",
      nombre: "Galletas de Agua",
      descripcion: "Paquete de galletas saladas simples",
      unidadMedida: "Paquete",
      precio: 4.0,
      marca: "Mabel's",
    },
    {
      codigo: "0004",
      nombre: "Jugo de Naranja",
      descripcion: "Jugo natural pasteurizado sin azúcar",
      unidadMedida: "Botella",
      precio: 12.0,
      marca: "Del Valle",
    },
    {
      codigo: "0005",
      nombre: "Queso Edam",
      descripcion: "Bloque de queso madurado semiduro",
      unidadMedida: "Kilogramo",
      precio: 45.0,
      marca: "San Javier",
    },
    {
      codigo: "0006",
      nombre: "Mantequilla con Sal",
      descripcion: "Barra de mantequilla pasteurizada",
      unidadMedida: "Barra 200g",
      precio: 15.5,
      marca: "Regia",
    },
  ];

  return (
    <div className="rounded-xl border border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 overflow-hidden">
      <div className="p-6 border-b border-border-color-light dark:border-border-color-dark">
        <h3 className="text-dark-gray dark:text-gray-100 text-lg font-bold">
          Inventario de Productos
        </h3>
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
            {products.map((product) => (
              <tr
                key={product.codigo}
                className="group hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
              >
                <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
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
            ))}
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
        <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-900 border border-border-color-light dark:border-border-color-dark rounded-lg shadow-xl z-50 p-1">
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

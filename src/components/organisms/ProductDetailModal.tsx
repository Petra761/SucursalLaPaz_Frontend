import { useState, useEffect, useRef } from "react";

interface Product {
  codigo: string;
  nombre: string;
  descripcion: string;
  unidadMedida: string;
  precio: number;
  marca: string;
  categoria?: string;
  totalVendido?: number;
  unidadesVendidas?: number;
  unidadesIngresadas?: number;
  stockActual?: number;
}

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const DATE_OPTIONS = [
  { label: "Últimos 7 días", factor: 0.2 },
  { label: "Últimos 30 días", factor: 1 }, 
  { label: "Este Trimestre", factor: 2.5 },
  { label: "Este Año", factor: 10 },
];

export function ProductDetailModal({
  isOpen,
  onClose,
  product,
}: ProductDetailModalProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(DATE_OPTIONS[1]);

  const filterRef = useRef<HTMLDivElement>(null);

  const baseMetrics = {
    totalVendido: product?.totalVendido || 18750.0,
    unidadesVendidas: product?.unidadesVendidas || 150,
    unidadesIngresadas: product?.unidadesIngresadas || 500,
    stockActual: product?.stockActual || 85,
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen || !product) return null;

  const categoria = product.categoria || "Lácteos y Derivados";

  const currentMetrics = {
    total: baseMetrics.totalVendido * selectedRange.factor,
    sold: Math.round(baseMetrics.unidadesVendidas * selectedRange.factor),
    entered: Math.round(baseMetrics.unidadesIngresadas * selectedRange.factor),
    stock: baseMetrics.stockActual,
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-lg h-full bg-background-dark text-gray-200 border-l border-border-color-dark flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-border-color-dark">
          <h3 className="text-xl font-semibold text-gray-100">
            Detalle del Producto
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <section>
            <h4 className="text-lg font-semibold text-gray-300 mb-4">
              Información General
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Código</p>
                <p className="font-medium text-gray-200">{product.codigo}</p>
              </div>
              <div>
                <p className="text-gray-400">Nombre</p>
                <p className="font-medium text-gray-200">{product.nombre}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400">Descripción</p>
                <p className="font-medium text-gray-200 leading-relaxed">
                  {product.descripcion || "Sin descripción disponible."}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Marca</p>
                <p className="font-medium text-gray-200">{product.marca}</p>
              </div>
              <div>
                <p className="text-gray-400">Categoría</p>
                <p className="font-medium text-gray-200">{categoria}</p>
              </div>
              <div>
                <p className="text-gray-400">Unidad de Medida</p>
                <p className="font-medium text-gray-200">
                  {product.unidadMedida}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Precio</p>
                <p className="font-medium text-gray-200">
                  Bs. {product.precio.toFixed(2)}
                </p>
              </div>
            </div>
          </section>

          <div className="border-t border-border-color-dark"></div>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-300">
                Métricas de Rendimiento
              </h4>

              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 rounded-md border border-border-color-dark px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-800 transition-colors bg-background-dark"
                >
                  <span className="material-symbols-outlined text-base">
                    calendar_today
                  </span>
                  <span>{selectedRange.label}</span>
                  <span
                    className={`material-symbols-outlined text-base transition-transform duration-200 ${
                      isFilterOpen ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {isFilterOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border-color-dark bg-gray-800 shadow-xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    {DATE_OPTIONS.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => {
                          setSelectedRange(option);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${
                          selectedRange.label === option.label
                            ? "bg-primary/20 text-primary"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                      >
                        {option.label}
                        {selectedRange.label === option.label && (
                          <span className="material-symbols-outlined text-sm">
                            check
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-800/50 border border-border-color-dark">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">
                    attach_money
                  </span>
                  Total Vendido
                </p>
                <p className="text-2xl font-bold text-accent-green mt-1 transition-all duration-300">
                  Bs.{" "}
                  {currentMetrics.total.toLocaleString("es-BO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-gray-800/50 border border-border-color-dark">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">
                    shopping_cart
                  </span>
                  Unidades Vendidas
                </p>
                <p className="text-2xl font-bold text-gray-100 mt-1 transition-all duration-300">
                  {currentMetrics.sold}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-gray-800/50 border border-border-color-dark">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">
                    archive
                  </span>
                  Unidades Ingresadas
                </p>
                <p className="text-2xl font-bold text-gray-100 mt-1 transition-all duration-300">
                  {currentMetrics.entered}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-gray-800/50 border border-border-color-dark">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">
                    inventory
                  </span>
                  Stock Actual
                </p>
                <p className="text-2xl font-bold text-accent-orange mt-1">
                  {currentMetrics.stock}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

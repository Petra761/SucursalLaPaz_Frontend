import type { Product } from "../../types/product.types";
import { useProductMovements } from "../../hooks/useProductMovements";

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export function ProductDetailModal({
  isOpen,
  onClose,
  product,
}: ProductDetailModalProps) {
  const { movements, metrics, loading } = useProductMovements(product?.codigo);

  if (!isOpen || !product) return null;

  const totalMoneySold = metrics.soldUnits * product.precio;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-xl h-full bg-background-dark text-gray-200 border-l border-border-color-dark flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-border-color-dark bg-gray-900">
          <div>
            <h3 className="text-xl font-semibold text-gray-100">
              Detalle del Producto
            </h3>
            <p className="text-sm text-gray-400">{product.nombre}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-background-dark">
          <section>
            <h4 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                info
              </span>
              Información General
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm bg-gray-800/30 p-4 rounded-xl border border-border-color-dark">
              <div>
                <p className="text-gray-500">Código</p>
                <p className="font-mono text-gray-300">{product.codigo}</p>
              </div>
              <div>
                <p className="text-gray-500">Marca</p>
                <p className="text-gray-300">{product.marca}</p>
              </div>
              <div>
                <p className="text-gray-500">Unidad</p>
                <p className="text-gray-300">{product.unidadMedida}</p>
              </div>
              <div>
                <p className="text-gray-500">Precio Unitario</p>
                <p className="font-bold text-green-400">
                  Bs. {product.precio.toFixed(2)}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500">Descripción</p>
                <p className="text-gray-300 italic">{product.descripcion}</p>
              </div>
            </div>
          </section>

          <section>
            <h4 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-accent-orange">
                analytics
              </span>
              Métricas de Inventario
            </h4>

            {loading ? (
              <div className="flex justify-center py-4">
                <span className="material-symbols-outlined animate-spin">
                  progress_activity
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gray-800 border border-border-color-dark">
                  <p className="text-xs text-gray-400 uppercase font-bold">
                    Total Vendido (Aprox)
                  </p>
                  <p className="text-2xl font-bold text-accent-green mt-1">
                    Bs.{" "}
                    {totalMoneySold.toLocaleString("es-BO", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gray-800 border border-border-color-dark">
                  <p className="text-xs text-gray-400 uppercase font-bold">
                    Unidades Vendidas
                  </p>
                  <p className="text-2xl font-bold text-gray-100 mt-1">
                    {metrics.soldUnits}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gray-800 border border-border-color-dark">
                  <p className="text-xs text-gray-400 uppercase font-bold">
                    Unidades Ingresadas
                  </p>
                  <p className="text-2xl font-bold text-gray-100 mt-1">
                    {metrics.enteredUnits}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gray-800 border border-border-color-dark">
                  <p className="text-xs text-gray-400 uppercase font-bold">
                    Stock Calculado
                  </p>
                  <p className="text-2xl font-bold text-blue-400 mt-1">
                    {metrics.stock}
                  </p>
                </div>
              </div>
            )}
          </section>

          <section>
            <h4 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-gray-400">
                history
              </span>
              Historial de Movimientos
            </h4>

            <div className="space-y-3">
              {loading ? (
                <p className="text-gray-500 text-center">
                  Cargando historial...
                </p>
              ) : movements.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 px-4 rounded-xl border-2 border-dashed border-gray-700 bg-gray-800/20">
                  <span className="material-symbols-outlined text-4xl text-gray-600 mb-2">
                    sentiment_dissatisfied
                  </span>
                  <p className="text-gray-400 font-medium">Nada por aquí</p>
                  <p className="text-gray-600 text-sm">
                    No se han registrado movimientos para este producto.
                  </p>
                </div>
              ) : (
                movements.map((mov) => {
                  const isEntrada = mov.tipoMovimiento === "Entrada";
                  const isSalida = mov.tipoMovimiento === "Salida";

                  return (
                    <div
                      key={mov.codigo}
                      className="flex gap-4 p-4 rounded-lg bg-gray-800 border border-border-color-dark hover:border-gray-600 transition-colors"
                    >
                      <div
                        className={`flex-shrink-0 flex items-center justify-center size-10 rounded-full ${
                          isEntrada
                            ? "bg-green-900/30 text-green-400"
                            : isSalida
                            ? "bg-red-900/30 text-red-400"
                            : "bg-yellow-900/30 text-yellow-400"
                        }`}
                      >
                        <span className="material-symbols-outlined">
                          {isEntrada
                            ? "arrow_downward"
                            : isSalida
                            ? "arrow_upward"
                            : "replay"}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-bold text-gray-200">
                            {mov.tipoMovimiento}
                          </p>
                          <span className="text-xs text-gray-500">
                            {new Date(mov.fecha).toLocaleDateString("es-BO", {
                              day: "2-digit",
                              month: "short",
                              year: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 truncate">
                          {mov.motivo}
                        </p>
                        <div className="mt-1 flex gap-3 text-xs">
                          <span
                            className={`${
                              isEntrada ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {isEntrada ? "+" : "-"}
                            {mov.cantidadBuena} {product.unidadMedida}
                          </span>
                          {mov.cantidadMala && mov.cantidadMala > 0 && (
                            <span className="text-orange-400">
                              ({mov.cantidadMala} dañados)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

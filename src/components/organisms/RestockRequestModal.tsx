import { useState, useEffect } from "react";
import type { FactoryProduct } from "../../types/factoryProduct.types";
import { getFactoryProducts } from "../../services/factory.service";

interface RestockRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (items: { product: FactoryProduct; quantity: number }[]) => void;
}

export function RestockRequestModal({
  isOpen,
  onClose,
  onSubmit,
}: RestockRequestModalProps) {
  const [products, setProducts] = useState<FactoryProduct[]>([]);
  const [loading, setLoading] = useState(false);

  // Diccionario: ID Producto -> Cantidad seleccionada
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    const fetchData = async () => {
      setQuantities({});
      setLoading(true);

      try {
        const data = await getFactoryProducts();
        if (isMounted) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleQuantityChange = (id: number, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const newValue = Math.max(0, current + delta);

      if (newValue === 0) {
        const newQuantities = { ...prev };
        delete newQuantities[id];
        return newQuantities;
      }

      return { ...prev, [id]: newValue };
    });
  };

  const handleManualInputChange = (id: number, valueStr: string) => {
    const newValue = parseInt(valueStr, 10);

    setQuantities((prev) => {
      if (isNaN(newValue) || newValue <= 0) {
        const newQuantities = { ...prev };
        delete newQuantities[id];
        return newQuantities;
      }
      return { ...prev, [id]: newValue };
    });
  };

  const handleSubmit = () => {
    const selectedItems = products
      .filter((p) => (quantities[p.idProducto] || 0) > 0)
      .map((p) => ({
        product: p,
        quantity: quantities[p.idProducto],
      }));

    if (selectedItems.length === 0) {
      alert("Selecciona al menos un producto.");
      return;
    }

    onSubmit(selectedItems);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full max-w-2xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-border-color-light dark:border-border-color-dark overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border-color-light dark:border-border-color-dark">
          <h2 className="text-lg font-bold text-dark-gray dark:text-gray-100">
            Solicitar Reposición de Inventario
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
          {loading ? (
            <div className="text-center py-10">
              <span className="material-symbols-outlined animate-spin text-3xl text-primary">
                progress_activity
              </span>
              <p className="text-gray-500 mt-2">
                Cargando catálogo de fábrica...
              </p>
            </div>
          ) : (
            products.map((prod) => {
              const qty = quantities[prod.idProducto] || 0;

              return (
                <div
                  key={prod.idProducto}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-border-color-light dark:border-border-color-dark shadow-sm transition-colors hover:border-primary/50"
                >
                  <img
                    src={prod.imagenUrl}
                    alt={prod.nombre}
                    className="object-cover w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700"
                    onError={(e) =>
                      (e.currentTarget.src = "https://via.placeholder.com/64")
                    }
                  />

                  <div className="flex-1">
                    <p className="font-bold text-dark-gray dark:text-gray-100 capitalize">
                      {prod.nombre}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {prod.codigo} • Stock Fábrica: {prod.stockActual}
                    </p>
                    <p className="text-sm text-primary font-medium">
                      Bs. {prod.costoProduccion}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(prod.idProducto, -1)}
                      disabled={qty === 0}
                      className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min="0"
                      value={qty === 0 ? "" : qty}
                      onChange={(e) =>
                        handleManualInputChange(prod.idProducto, e.target.value)
                      }
                      placeholder="0"
                      className="w-16 h-8 text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-dark-gray dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />

                    <button
                      onClick={() => handleQuantityChange(prod.idProducto, 1)}
                      className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex justify-end gap-4 p-6 bg-white dark:bg-gray-900 border-t border-border-color-light dark:border-border-color-dark">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 text-sm font-bold text-white rounded-lg bg-primary hover:bg-primary/90 shadow-md transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">send</span>
            Enviar Solicitud
          </button>
        </div>
      </div>
    </div>
  );
}

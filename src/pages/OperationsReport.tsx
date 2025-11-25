import { useState } from "react";
import { StatCardSimple } from "../components/molecules/StatCardSimple";
import { InventoryTable } from "../components/organisms/InventoryTable";
import { ProductDetailModal } from "../components/organisms/ProductDetailModal";
import { RestockRequestModal } from "../components/organisms/RestockRequestModal";
import { ToastNotification } from "../components/atoms/ToastNotification";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product.types";
import type {
  FactoryProduct,
  RestockPayload,
} from "../types/factoryProduct.types";
import { createFactoryRequest } from "../services/factory.service";

export function OperationsReport() {
  const { products, loading, error } = useProducts();

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleRequestRestock = () => {
    setIsRestockModalOpen(true);
  };

  const handleSubmitRestock = async (
    items: { product: FactoryProduct; quantity: number }[]
  ) => {
    setIsSending(true);

    try {
      const requestPromises = items.map((item) => {
        const payload: RestockPayload = {
          CodSucursal: 1,
          CodArticulo: item.product.idProducto,
          Cantidad: item.quantity,
        };

        return createFactoryRequest(payload);
      });

      await Promise.all(requestPromises);

      setToastMessage(
        `Se enviaron ${items.length} solicitudes de reposición correctamente.`
      );
      setShowToast(true);
    } catch (err) {
      console.error(err);
      alert(
        "Hubo un error al procesar algunas solicitudes. Revisa la consola o intenta nuevamente."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 relative">
      {isSending && (
        <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl flex flex-col items-center gap-4">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary">
              autorenew
            </span>
            <p className="text-dark-gray dark:text-white font-bold">
              Procesando pedidos...
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-between gap-4 items-center">
        <h1 className="text-dark-gray dark:text-gray-100 text-3xl font-black leading-tight">
          Reporte de Operaciones
        </h1>

        <button
          onClick={handleRequestRestock}
          className="flex items-center justify-center h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold gap-2 hover:bg-primary/90 transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-xl">
            playlist_add
          </span>
          <span className="hidden sm:inline">Solicitar Reposición</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          Error al cargar el inventario: {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCardSimple
          icon="trending_up"
          title="Producto más vendido"
          value="Laptop Gamer Pro X"
          subtext="345 unidades"
        />
        <StatCardSimple
          icon="inventory_2"
          title="Producto más escaso"
          value="Monitor Curvo 4K"
          subtext="5 unidades restantes"
        />
        <StatCardSimple
          icon="account_balance_wallet"
          title="Valor total de inventario"
          value="$258,300.50"
          subtext="Calculado sobre 82 productos"
        />
      </div>

      <InventoryTable
        data={products}
        isLoading={loading}
        onViewDetail={handleViewDetail}
      />

      <ProductDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        product={selectedProduct}
      />

      <RestockRequestModal
        isOpen={isRestockModalOpen}
        onClose={() => setIsRestockModalOpen(false)}
        onSubmit={handleSubmitRestock}
      />

      <ToastNotification
        isVisible={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

import { useState } from "react";
import { StatCardSimple } from "../components/molecules/StatCardSimple";
import { InventoryTable } from "../components/organisms/InventoryTable";
import { ProductDetailModal } from "../components/organisms/ProductDetailModal";
import type { Product } from "../types/product.types";
import { useProducts } from "../hooks/useProducts";

export function OperationsReport() {
  const { products, loading, error } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleRequestRestock = () => {
    console.log("Abrir modal de reposición (Pendiente)");
  };

  return (
    <div className="flex flex-col gap-6 relative">
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
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCardSimple
          icon="trending_up"
          title="Producto más vendido"
          value="Leche de mipalo"
          subtext="345 unidades"
        />
        <StatCardSimple
          icon="inventory_2"
          title="Producto más escaso"
          value="Crema de leche"
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}

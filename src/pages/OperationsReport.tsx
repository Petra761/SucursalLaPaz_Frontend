import { useState } from "react";
import { StatCardSimple } from "../components/molecules/StatCardSimple";
import {
  InventoryTable,
  type Product,
} from "../components/organisms/InventoryTable";
import { ProductDetailModal } from "../components/organisms/ProductDetailModal";

export function OperationsReport() {
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
      </div>

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
        onViewDetail={handleViewDetail}
        onRequestRestock={handleRequestRestock}
      />

      <ProductDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}

import { useState, useEffect } from "react";
import type { InventoryMovement } from "../types/movement.types";
import { getMovements } from "../services/movement.service";

export function useProductMovements(productCode: string | undefined) {
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [loading, setLoading] = useState(false);

  const [metrics, setMetrics] = useState({
    stock: 0,
    soldUnits: 0,
    enteredUnits: 0,
  });

  useEffect(() => {
    if (!productCode) return;

    const fetchData = async () => {
      setLoading(true);
      const allMovements = await getMovements();

      const productMoves = allMovements.filter(
        (m) => m.codigoProducto === productCode
      );

      productMoves.sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );

      setMovements(productMoves);

      let stock = 0;
      let sold = 0;
      let entered = 0;

      productMoves.forEach((m) => {
        const tipo = m.tipoMovimiento.toLowerCase();

        if (tipo === "entrada") {
          stock += m.cantidadBuena;
          entered += m.cantidadBuena;
        } else if (tipo === "salida") {
          stock -= m.cantidadBuena;
          sold += m.cantidadBuena;
        } else if (tipo === "devuelto") {
          stock += m.cantidadBuena;
        }
      });

      setMetrics({
        stock: Math.max(0, stock),
        soldUnits: sold,
        enteredUnits: entered,
      });

      setLoading(false);
    };

    fetchData();
  }, [productCode]);

  return { movements, metrics, loading };
}

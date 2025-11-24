import type { InventoryMovement } from "../types/movement.types";

const API_URL =
  "https://almacenlp-production-3050.up.railway.app/api/MovimientoInventarios/Sucursal";

export const getMovements = async (): Promise<InventoryMovement[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener movimientos");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

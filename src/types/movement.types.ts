export interface InventoryMovement {
  codigoProducto: string;
  codigo: string;
  cantidadBuena: number;
  cantidadMala: number | null;
  tipoMovimiento: "Salida" | "Entrada" | "Devuelto";
  motivo: string;
  fecha: string;
}

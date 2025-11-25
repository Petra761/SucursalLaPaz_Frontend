export interface FactoryProduct {
  idProducto: number;
  codigo: string;
  nombre: string;
  categoria: string;
  costoProduccion: number;
  stockActual: number;
  stockMinimo: number;
  imagenUrl: string;
}

export interface RestockPayload {
  CodSucursal: number; // "LP-001" o eso debia ser
  CodArticulo: number; // idProducto
  Cantidad: number;
}

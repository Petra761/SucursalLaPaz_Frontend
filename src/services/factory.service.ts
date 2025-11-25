import type {
  FactoryProduct,
  RestockPayload,
} from "../types/factoryProduct.types";

const BASE_URL = "https://test-production-d2fa.up.railway.app/api";

export const getFactoryProducts = async (): Promise<FactoryProduct[]> => {
  try {
    const response = await fetch(`${BASE_URL}/productos`);
    if (!response.ok) throw new Error("Error al cargar productos de fábrica");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createFactoryRequest = async (
  payload: RestockPayload
): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/SolicitudDemanda`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error al solicitar ${payload.CodArticulo}: ${
          errorText || response.statusText
        }`
      );
    }
  } catch (error) {
    console.error("Error en createFactoryRequest:", error);
    throw error;
  }
};

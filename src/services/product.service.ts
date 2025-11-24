import type { Product } from "../types/product.types";

const API_URL = "https://almacenlp-production-3050.up.railway.app/api/Productos";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};
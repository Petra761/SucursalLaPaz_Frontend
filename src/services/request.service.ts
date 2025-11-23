import type {
  RequestBackend,
  CreateRequestPayload,
} from "../types/request.types.ts";

const API_URL = "https://localhost:7193/api/Solicitudes";

export const getRequests = async (): Promise<RequestBackend[]> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    throw error;
  }
};

export const createRequest = async (
  payload: CreateRequestPayload
): Promise<void> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        errorData || `Error al crear solicitud: ${response.status}`
      );
    }
  } catch (error) {
    console.log("Error request", error);
    throw error;
  }
};

export const updateRequestStatus = async (
  codigo: string,
  estado: "Aprobada" | "Rechazada",
  justificacionRechazo?: string
): Promise<void> => {
  try {
    const response = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codigo,
        estado,
        justificacionRechazo: justificacionRechazo || null,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el estado de la solicitud");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};

export const deleteRequest = async (codigo: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${codigo}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la solicitud");
    }
  } catch (error) {
    console.error("Error deleting request:", error);
    throw error;
  }
};

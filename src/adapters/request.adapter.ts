import type {
  RequestBackend,
  RequestFrontend,
  FrontendStatus,
} from "../types/request.types";

export const requestAdapter = (
  backendData: RequestBackend
): RequestFrontend => {
  let normalizedStatus: FrontendStatus = "Pendiente";

  const backendStatus = backendData.estado.toLowerCase();

  if (
    backendStatus.includes("aprobada") ||
    backendStatus.includes("aprobado")
  ) {
    normalizedStatus = "Aprobado";
  } else if (
    backendStatus.includes("rechazada") ||
    backendStatus.includes("rechazado")
  ) {
    normalizedStatus = "Rechazado";
  } else {
    normalizedStatus = "Pendiente";
  }

  return {
    id: backendData.codigo,
    requester: backendData.codSolicitante,
    destination: backendData.codDestino,
    type: backendData.tipoSolicitud,
    subject: backendData.asunto,
    status: normalizedStatus,
    date: backendData.fechaCreacion,
  };
};

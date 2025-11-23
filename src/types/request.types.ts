export interface RequestBackend {
  codigo: string;
  codSolicitante: string;
  codDestino: string;
  tipoSolicitud: string;
  asunto: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  fechaCreacion: string;
  fechaAprobacionRechazo: string | null;
  codAprobadorRechazador: string | null;
  justificacionRechazo: string | null;
  ultimaActualizacion: string;
}

export type FrontendStatus = "Aprobado" | "Pendiente" | "Rechazado";

export interface RequestFrontend {
  id: string;
  requester: string;
  destination: string;
  type: string;
  subject: string;
  status: FrontendStatus;
  date: string;
  description?: string;
  priority?: string;
  rejectionReason?: string;
  rejectionDate?: string;
  updatedDate?: string;
}

export interface CreateRequestPayload {
  codSolicitante: string;
  codDestino: string;
  tipoSolicitud: string;
  asunto: string;
  descripcion: string;
  prioridad: string;
}

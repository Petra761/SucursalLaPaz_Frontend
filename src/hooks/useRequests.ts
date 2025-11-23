import { useState, useEffect, useCallback } from "react";
import type { RequestFrontend } from "../types/request.types.ts";
import { getRequests } from "../services/request.service.ts";
import { requestAdapter } from "../adapters/request.adapter.ts";

export function useRequests() {
  const [requests, setRequests] = useState<RequestFrontend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const rawData = await getRequests();
      const adaptedData = rawData.map(requestAdapter);
      setRequests(adaptedData);
      setError(null);
    } catch (err) {
      setError(`Error de conexión con el servidor: ${err}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return { requests, loading, error, refresh: fetchRequests };
}

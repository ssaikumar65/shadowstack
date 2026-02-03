import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

export function useScan() {
  return useMutation({
    mutationFn: async (domain: string) => {
      try {
        const { data } = await api.post("/scan", { domain });
        return data;
      } catch (err: unknown) {
        const error = err as AxiosError;
        const message =
          (error.response?.data as { error?: string })?.error ||
          error.message ||
          "Failed to scan company";
        throw new Error(message);
      }
    },
  });
}

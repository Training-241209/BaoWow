import { axiosInstance } from "@/lib/axios-config";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useGetStudySets(): UseQueryResult<any[]> {
  return useQuery({
    queryKey: ["study-sets"],
    queryFn: async () => {
      try {
        const resp = await axiosInstance.get("/study-sets");
        return resp.data;
      } catch (e) {
        console.error(e);
      }
    },
  });
}

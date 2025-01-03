import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { formSchema } from "../components/create-study-set-dialog";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";

export function useCreateStudySet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const resp = await axiosInstance.post("/study-sets", {
        title: values.name,
      });
      return resp.data;
    },
    onSuccess: () => {
      toast.success("Study set created");
      queryClient.invalidateQueries({
        queryKey: ["study-sets"],
      });
    },
    onError: () => {
      toast.error("Failed to create study set");
    },
  });
}

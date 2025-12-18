"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { connectRepository } from "@/module/repository/actions";

export const useConnectRepository = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ owner, repo, githubId }: { owner: string; repo: string; githubId: number }) => {
      return await connectRepository(owner, repo, githubId);
    },
    onSuccess: () => {
      alert("Repository connected successfully");
      queryClient.invalidateQueries({ queryKey: ["repositories"] });
    },
    onError: (error) => {
      alert("Failed to connect repository");
      console.error(error);
    },
  });
};

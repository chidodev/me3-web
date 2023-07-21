import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type GlobalLoading = {
  isGlobalLoading: boolean;
  enableGlobalLoading: () => void;
  disableGlobalLoading: () => void;
};

export function useGlobalLoading(): GlobalLoading {
  const queryClient = useQueryClient();

  const { data: isGlobalLoading } = useQuery({
    queryKey: ["globalLoading"],
    queryFn: () => Promise.resolve(sessionStorage.getItem("globalLoading") === "true"),
    initialData: true,
    staleTime: Infinity, // When using sessionStorage, there is no stale time and we don't ever want to re-fetch the data, we only refetch using invalidation instead
  });

  const { mutate: enableGlobalLoading } = useMutation({
    mutationFn: () => Promise.resolve(sessionStorage.setItem("globalLoading", "true")),
    onSuccess: () => {
      void queryClient.invalidateQueries(["globalLoading"]);
    },
  });

  const { mutate: disableGlobalLoading } = useMutation({
    mutationFn: () => Promise.resolve(sessionStorage.setItem("globalLoading", "false")),
    onSuccess: () => {
      void queryClient.invalidateQueries(["globalLoading"]);
    },
  });

  return { isGlobalLoading, enableGlobalLoading, disableGlobalLoading };
}

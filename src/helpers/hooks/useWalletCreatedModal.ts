import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type WalletCreatedModal = {
  isWalletCreatedModalOpen: boolean;
  enableWalletCreatedModal: () => void;
  disableWalletCreatedModal: () => void;
};

export function useWalletCreatedModal(): WalletCreatedModal {
  const queryClient = useQueryClient();

  const { data: isWalletCreatedModalOpen } = useQuery({
    queryKey: ["walletCreatedModal"],
    queryFn: () => Promise.resolve(sessionStorage.getItem("walletCreatedModal") === "true"),
    initialData: false,
    staleTime: Infinity, // When using sessionStorage, there is no stale time and we don't ever want to re-fetch the data, we only refetch using invalidation instead
  });

  const { mutate: enableWalletCreatedModal } = useMutation({
    mutationFn: () => Promise.resolve(sessionStorage.setItem("walletCreatedModal", "true")),
    onSuccess: () => {
      void queryClient.invalidateQueries(["walletCreatedModal"]);
    },
  });

  const { mutate: disableWalletCreatedModal } = useMutation({
    mutationFn: () => Promise.resolve(sessionStorage.setItem("walletCreatedModal", "false")),
    onSuccess: () => {
      void queryClient.invalidateQueries(["walletCreatedModal"]);
    },
  });

  return { isWalletCreatedModalOpen, enableWalletCreatedModal, disableWalletCreatedModal };
}

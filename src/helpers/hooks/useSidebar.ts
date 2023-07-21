import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Sidebar = {
  isSidebarOpen: boolean;
  enableSidebar: () => void;
  disableSidebar: () => void;
};

export function useSidebar(): Sidebar {
  const queryClient = useQueryClient();

  const { data: isSidebarOpen } = useQuery({
    queryKey: ["sidebar"],
    queryFn: () => Promise.resolve(sessionStorage.getItem("sidebar") === "true"),
    initialData: false,
    staleTime: Infinity, // When using sessionStorage, there is no stale time and we don't ever want to re-fetch the data, we only refetch using invalidation instead
  });

  const { mutate: enableSidebar } = useMutation({
    mutationFn: () => Promise.resolve(sessionStorage.setItem("sidebar", "true")),
    onSuccess: () => {
      void queryClient.invalidateQueries(["sidebar"]);
    },
  });

  const { mutate: disableSidebar } = useMutation({
    mutationFn: () => Promise.resolve(sessionStorage.setItem("sidebar", "false")),
    onSuccess: () => {
      void queryClient.invalidateQueries(["sidebar"]);
    },
  });

  return { isSidebarOpen, enableSidebar, disableSidebar };
}

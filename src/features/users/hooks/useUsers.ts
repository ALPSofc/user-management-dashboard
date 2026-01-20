import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, fetchUsers, updateUser } from "../api/usersApi";
import type { UsersListResponse } from "../api/usersApi";

export function useUsers(params: {
  page: number;
  pageSize: number;
  q: string;
  status: "all" | "active" | "inactive";
}) {
  const qc = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ["users", params],
    queryFn: () => fetchUsers(params),
  });

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: any }) => updateUser(id, patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,

    // optimistic update
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: ["users"] });

      const previous = qc.getQueriesData<UsersListResponse>({ queryKey: ["users"] });

      qc.setQueriesData<UsersListResponse>({ queryKey: ["users"] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.filter((u) => u.id !== id),
          total: Math.max(0, old.total - 1),
        };
      });

      return { previous };
    },

    onError: (_err, _id, ctx) => {
      ctx?.previous?.forEach(([key, data]) => {
        qc.setQueryData(key, data);
      });
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { usersQuery, createMutation, updateMutation, deleteMutation };
}

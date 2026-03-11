import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBuilding, getBuildings } from "./buildings.api";

export const useBuildings = () => {
  return useQuery({
    queryKey: ["buildings"],
    queryFn: getBuildings,
  });
};

export const useCreateBuilding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBuilding,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["buildings"],
      });
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { getBuildings } from "./buildings.api";

export const useBuildings = () => {
  return useQuery({
    queryKey: ["buildings"],
    queryFn: getBuildings,
  });
};

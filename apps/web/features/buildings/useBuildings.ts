import { useQuery } from "@tanstack/react-query";
import { getBuildings } from "./buildings.api";

export function useBuildings() {
  return useQuery({
    queryKey: ["buildings"],
    queryFn: getBuildings,
  });
}

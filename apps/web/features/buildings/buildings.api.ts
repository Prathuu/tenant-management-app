import { api } from "@/lib/api";
import { Building } from "./buildings.types";

export const getBuildings = async (): Promise<Building[]> => {
  const { data } = await api.get("/buildings");
  return data;
};

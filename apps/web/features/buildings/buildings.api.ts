import { api } from "@/lib/api";
import { Building, BuildingsListType } from "./buildings.types";

export const createBuilding = async (payload: Partial<Building>) => {
  const { data } = await api.post("/buildings", payload);
  return data;
};

export const getBuildings = async (): Promise<BuildingsListType[]> => {
  const { data } = await api.get("/buildings");
  return data;
};

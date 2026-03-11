import { apiClient } from "@/lib/api";

export const getBuildings = async () => {
  const { data } = await apiClient.get("/buildings");
  return data;
};

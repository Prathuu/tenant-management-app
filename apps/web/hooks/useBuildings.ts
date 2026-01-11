import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useBuildings() {
  return useQuery({
    queryKey: ['buildings'],
    queryFn: async () => {
      const res = await api.get('/buildings');
      return res.data;
    },
  });
}


export function useBuilding(id: number) {
  return useQuery({
    queryKey: ['building', id],
    queryFn: async () => {
      const res = await api.get(`/buildings/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}
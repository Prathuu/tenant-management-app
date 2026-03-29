export type Building = {
  id: string;
  name: string;
  address: string;
  city: string;
  totalUnits: number;
  occupiedUnits: number;
  vacantUnits: number;
  monthlyRevenue: number;
};

export type BuildingsListType = {
  totalBuildings: number;
  totalRooms: number;
  occupiedRooms: number;
  vacantRooms: number;
  name: string;
};

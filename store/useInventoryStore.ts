import { create } from "zustand";

interface InventoryState {
  inventory: any;
  setInventory: (inventory: any) => void;
}

const useInventoryStore = create<InventoryState>()((set) => ({
  inventory: {},
  setInventory: (inventory) => set({ inventory }),
}));

export default useInventoryStore;

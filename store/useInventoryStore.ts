import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface InventoryState {
  inventory: any;
  setInventory: (inventory: any) => void;
}

const useInventoryStore = create<InventoryState>()(
  devtools(
    persist(
      (set) => ({
        inventory: {},
        setInventory: (inventory) => set({ inventory }),
      }),
      { name: "inventory" }
    )
  )
);

export default useInventoryStore;

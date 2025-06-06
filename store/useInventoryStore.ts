import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ItemData {
  count: number;
  boxCount?: number;
}

interface InventoryData {
  [type: string]: {
    [label: string]: ItemData;
  };
}

interface InventoryState {
  inventory: InventoryData;
  setItem: (type: string, label: string, item: ItemData) => void;
  resetInventory: () => void;
  getInventory: () => InventoryData;
}

const useInventoryStore = create<InventoryState>()(
  devtools(
    persist(
      (set, get) => ({
        inventory: {},
        setItem: (type, label, item) =>
          set((state) => ({
            inventory: {
              ...state.inventory,
              [type]: {
                ...state.inventory[type],
                [label]: item,
              },
            },
          })),
        resetInventory: () => set({ inventory: {} }),
        getInventory: () => get().inventory,
      }),
      { name: "inventory" }
    )
  )
);

export default useInventoryStore;

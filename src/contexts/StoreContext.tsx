import { createContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { InventoryItem } from "../navigation/types";

type StoreContextType = {
  addItem(item: InventoryItem): void;
  findItem(id: string): InventoryItem | {} | undefined;
  inventory: InventoryItem[];
  removeItem(id: string): void;
  updateItem(item: InventoryItem): void;
  upsertItem(item: InventoryItem): void;
};

export const StoreContext = createContext<StoreContextType>(
  {} as StoreContextType
);

const LS_INVENTORY = "ls_inventory";

const StoreProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const loadInventory = async () => {
    try {
      const localInventory = await AsyncStorage.getItem(LS_INVENTORY);
      if (localInventory) {
        setInventory(JSON.parse(localInventory));
      }
    } catch (e) {
      console.log(e);
      // call logger
    } finally {
      setIsLoading(false);
    }
  };

  const updateLocalInventory = async (newInventory: InventoryItem[]) => {
    try {
      const value = JSON.stringify(newInventory);
      await AsyncStorage.setItem(LS_INVENTORY, value);
    } catch (e) {
      console.log(e);
      // call logger
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const addItem = async (item: InventoryItem) => {
    const id = uuid.v4() as string;
    const newInventory = [{ ...item, id }, ...inventory];
    setInventory(newInventory);
    await updateLocalInventory(newInventory);
  };

  const removeItem = async (id: string) => {
    const newInventory = inventory.filter((i) => i.id !== id);
    setInventory(newInventory);
    await updateLocalInventory(newInventory);
  };

  const updateItem = async (item: InventoryItem) => {
    const newInventory = inventory.map((i) => (i.id === item.id ? item : i));
    setInventory(newInventory);
    await updateLocalInventory(newInventory);
  };

  const findItem = (id?: string) => {
    if (id) {
      return inventory.find((i) => i.id === id);
    }
    return {};
  };

  const upsertItem = (item: InventoryItem) => {
    if (item.id) {
      updateItem(item);
    } else {
      addItem(item);
    }
  };

  if (isLoading)
    return (
      <ActivityIndicator
        size="large"
        style={{ justifyContent: "center", flex: 1 }}
      />
    );

  return (
    <StoreContext.Provider
      value={{
        addItem,
        findItem,
        inventory,
        removeItem,
        updateItem,
        upsertItem,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

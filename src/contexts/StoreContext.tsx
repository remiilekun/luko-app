import { createContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

type InventoryItem = {
  id?: number;
  name: string;
  purchasePrice: number | string;
  type?: string;
  description?: string;
  photo?: string;
};

type StoreContextType = {
  addItem(item: InventoryItem): void;
  inventory: InventoryItem[];
  removeItem(id: number): void;
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
    console.log(Constants.name);
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

  const updateLocalInventory = async () => {
    try {
      const value = JSON.stringify(inventory);
      await AsyncStorage.setItem(LS_INVENTORY, value);
    } catch (e) {
      console.log(e);
      // call logger
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const addItem = (item: InventoryItem) => {
    setInventory((v) => [{ ...item, id: v.length }, ...v]);
    updateLocalInventory();
  };

  const removeItem = (id: number) => {
    setInventory((v) => v.filter((i) => i.id !== id));
    updateLocalInventory();
  };

  const updateItem = (item: InventoryItem) => {
    setInventory((v) => v.map((i) => (i.id === item.id ? item : i)));
    updateLocalInventory();
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
      value={{ addItem, inventory, removeItem, updateItem, upsertItem }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

import { createContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";

type InventoryItem = {
  id: number;
  name: string;
  purchasePrice: number;
  type?: string;
  description?: string;
  photo?: string;
};

type StoreContextType = {};

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
    setInventory((v) => [item, ...v]);
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

  if (isLoading)
    return (
      <ActivityIndicator
        size="large"
        style={{ justifyContent: "center", flex: 1 }}
      />
    );

  return (
    <StoreContext.Provider
      value={{ addItem, inventory, removeItem, updateItem }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

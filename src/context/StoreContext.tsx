import React, { createContext, ReactNode, useContext, useMemo } from "react";
import ListRepository from "../storage/Implementation/listRepository";
import ProductRepository from "../storage/Implementation/productRepository";
import TagRepository from "../storage/Implementation/tagRepository";
import AmountRepository from "../storage/Implementation/amountRepository";
import ConfigRepository from "../storage/Implementation/configRepository";

interface StoreContextProps {
  children: ReactNode;
}

const StoreContext = createContext({
  ListRepository,
  ProductRepository,
  TagRepository,
  AmountRepository, ConfigRepository
});

export const StoreProvider = ({ children }: StoreContextProps) => {
  const storeValue = useMemo(
    () => ({
      ListRepository,
      ProductRepository,
      TagRepository,
      AmountRepository,
      ConfigRepository
    }),
    []
  );
  return (
    <StoreContext.Provider value={storeValue}>{children}</StoreContext.Provider>
  );
};

export const useStores = () => useContext(StoreContext);

import React, { createContext, ReactNode, useContext, useMemo } from "react";
import ListRepository from "../storage/Implementation/listRepository";
import ProductRepository from "../storage/Implementation/productRepository";
import TagRepository from "../storage/Implementation/tagRepository";
import AmountRepository from "../storage/Implementation/amountRepository";

interface StoreContextProps {
  children: ReactNode;
}

const StoreContext = createContext({
  ListRepository,
  ProductRepository,
  TagRepository,
  AmountRepository,
});

export const StoreProvider = ({ children }: StoreContextProps) => {
  const storeValue = useMemo(
    () => ({
      ListRepository,
      ProductRepository,
      TagRepository,
      AmountRepository,
    }),
    []
  );
  return (
    <StoreContext.Provider value={storeValue}>{children}</StoreContext.Provider>
  );
};

export const useStores = () => useContext(StoreContext);

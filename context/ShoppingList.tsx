import React, { createContext, useContext, useEffect, useState } from 'react';
import ListStorage from '../utils/list'
import { listInterface, listType } from '../types/types'
type ShoppingListProviderProps = {
  children: React.ReactNode;
}

type ShoppingListContextType = {
  value: listType;
  setValue: React.Dispatch<React.SetStateAction<listType | null>>
}

const getListFromStorage = async (): Promise<listType | null> => {
  const list = await ListStorage.getListArchived()
  return list;
}

const setListFromStorage = (newList: listType): void => {
  ListStorage.setListArchived([...newList])
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

const ShoppingListProvider: React.FC<ShoppingListProviderProps> = ({ children }) => {
  const [list, setList] = useState<listType | null>(null);
  const loadList = async (): Promise<void> => {
    const listArr = await getListFromStorage();
    setList(listArr);
  }

  useEffect(() => {
    loadList()

  }, []);
  useEffect(() => {
    list && setListFromStorage(list!)
  }, [list]);

  return (
    <ShoppingListContext.Provider value={{ value: list!, setValue: setList }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

const useShoppingListContext = () => {
  const context = useContext(ShoppingListContext);

  if (!context) {
    throw new Error('useShoppingListContext must be used within a ShoppingListProvider');
  }

  return context;
}

export { ShoppingListProvider, useShoppingListContext };
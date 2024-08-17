import { useState, useEffect } from "react";
import ListRepository from "../../storage/Implementation/listRepository";
import { IList } from "../../Model/IList";

export const useListViewModel = () => {
  const [items, setItems] = useState<IList[]>([]);

  const loadItemsFromRepository = () => {
    const fetchedItems = ListRepository.getAllItems();
    setItems(fetchedItems);
  };

  useEffect(() => {
    loadItemsFromRepository();
  }, []);

  const addItem = (item: IList) => {
    ListRepository.addItem(item);
    loadItemsFromRepository();
  };

  const removeItem = (uuid: string) => {
    ListRepository.removeItem(uuid);
    loadItemsFromRepository();
  };
  const editItem = (uuid: string, name: string) => {
    ListRepository.editItem(uuid, name);
    loadItemsFromRepository();
  };
  const copyItem = (uuid: string, name: string) => {
    ListRepository.copyItem(uuid, name);
    loadItemsFromRepository();
  };

  return {
    items,
    addItem,
    removeItem,
    editItem,
    copyItem,
  };
};

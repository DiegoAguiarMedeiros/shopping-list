import { useState, useEffect } from "react";
import TagRepository from "../../storage/Implementation/tagRepository";
import ITag from "../../Model/ITag";

export const useTagViewModel = () => {
  const [items, setItems] = useState<ITag[]>([]);

  const loadItemsFromRepository = () => {
    const fetchedItems = TagRepository.getAllItems();
    setItems(fetchedItems);
  };

  useEffect(() => {
    loadItemsFromRepository();
  }, []);

  const addItem = (item: ITag) => {
    TagRepository.addItem(item);
    loadItemsFromRepository();
  };

  const removeItem = (uuid: string) => {
    TagRepository.removeItem(uuid);
    loadItemsFromRepository();
  };
  const editItem = (uuid: string, name: string) => {
    TagRepository.editItem(uuid, name);
    loadItemsFromRepository();
  };

  return {
    items,
    addItem,
    removeItem,
    editItem,
  };
};

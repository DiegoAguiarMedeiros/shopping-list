import { useState, useEffect } from "react";
import ProductRepository from "../../storage/Implementation/productRepository";
import TagRepository from "../../storage/Implementation/tagRepository";
import { IProduct } from "../../Model/IProduct";
import ITag from "../../Model/ITag";

export const useProductViewModel = () => {
  const [items, setItems] = useState<IProduct[]>([]);

  const loadItemsFromRepository = () => {
    const fetchedItems = ProductRepository.getAllItems();
    setItems(fetchedItems);
  };

  useEffect(() => {
    loadItemsFromRepository();
  }, []);

  const addItem = (item: IProduct) => {
    ProductRepository.addItem(item);
    loadItemsFromRepository();
  };

  const removeItem = (uuid: string) => {
    ProductRepository.removeItem(uuid);
    loadItemsFromRepository();
  };
  const editItem = (uuid: string, name: string, tag?: string) => {
    ProductRepository.editItem(uuid, name, tag);
    loadItemsFromRepository();
  };

  return {
    items,
    addItem,
    removeItem,
    editItem,
  };
};

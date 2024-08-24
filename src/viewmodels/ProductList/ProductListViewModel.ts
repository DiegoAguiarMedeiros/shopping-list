import { useState, useEffect } from "react";
import ProductRepository from "../../storage/Implementation/productRepository";
import TagRepository from "../../storage/Implementation/tagRepository";
import { IProduct } from "../../Model/IProduct";
import ITag from "../../Model/ITag";

export const useProductListViewModel = (tagUuid: string) => {
  const [items, setItems] = useState<IProduct[]>([]);
  const [tag, setTag] = useState<ITag>({ name: "", uuid: "", productsQTD: 0 });

  const loadItemsFromRepository = () => {
    const fetchedItems = ProductRepository.getAllItemsByTag(tagUuid);
    setItems(fetchedItems);
  };

  const loadTagFromRepository = () => {
    const fetchedItems = TagRepository.getItem(tagUuid);
    fetchedItems && setTag(fetchedItems);
  };

  useEffect(() => {
    loadItemsFromRepository();
    loadTagFromRepository();
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
    tag,
    addItem,
    removeItem,
    editItem,
    loadTagFromRepository,
  };
};

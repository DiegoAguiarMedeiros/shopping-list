import IStorage from "../../../Service/IMMKVStorage";
import { IListInterface } from "../../../Model/IList";
import { IProduct } from "../../../Model/IProduct";

export default class GetAllProductsUseCase {
  constructor(private mmkv: IStorage) {}

  execute = (key: string): string[] => {
    try {
      const data = this.mmkv.get(key);
      if (data) {
        const list: string[] = JSON.parse(data);
        return list;
      }
      return [];
    } catch (error) {
      console.error("GetAllProductsUseCase", error);
      return [];
    }
  };
}

import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IProduct } from "../../../Model/IProduct";

export default class GetProductUseCase {
  constructor(private MMKVStorage: IMMKVStorage) {}

  execute = (key: string): IProduct | null => {
    try {
      const data = this.MMKVStorage.get(key);
      if (data) {
        const product: IProduct = JSON.parse(data);
        return product;
      }
      return null;
    } catch (error) {
      console.error("GetProductUseCase", error);
      return null;
    }
  };
}

import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IProduct } from "../../../Model/IProduct";

export default class GetListProductUseCase {
  constructor(private asyncStorage: IMMKVStorage) { }

  execute = (key: string): IProduct | null => {
    try {
      const data = this.asyncStorage.get(key);
      if (data) {
        const productList: IProduct = JSON.parse(data);
        return productList;
      }
      return null;
    } catch (error) {
      console.error("GetListProductUseCase", error);
      return null;
    }
  };
}

import IStorage from "../../../Service/IMMKVStorage";
import { IListInterface } from "../../../Model/IList";
import { IProduct } from "../../../Model/IProduct";

export default class GetListProductsUseCase {
  constructor(private mmkv: IStorage) { }

  execute = (key: string): IListInterface<IProduct> => {
    try {
      const data = this.mmkv.get(key);
      if (data) {
        const list: IListInterface<IProduct> = JSON.parse(data);
        return list;
      }
      return {};
    } catch (error) {
      console.error("GetListsUseCase", error);
      return {};
    }
  };
}

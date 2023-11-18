import { IListInterface } from "../../../Model/IList";
import { IProduct } from "../../../Model/IProduct";
import IMMKVStorage from "../../../Service/IMMKVStorage";
import { AsyncStorageStatic } from "@react-native-async-storage/async-storage";

export default class SaveListProductsUseCase {
  constructor(private asyncStorage: IMMKVStorage) { }

  execute = async (key: string, data: IListInterface<IProduct>): Promise<void> => {
    try {
      this.asyncStorage.set(key, JSON.stringify(data));
    } catch (error) {
      console.error("SaveListProductsUseCase", error);
    }
  };
}

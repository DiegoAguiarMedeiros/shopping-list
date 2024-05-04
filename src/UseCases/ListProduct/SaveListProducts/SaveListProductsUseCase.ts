import { IListInterface } from "../../../Model/IList";
import { IProduct } from "../../../Model/IProduct";
import IMMKVStorage from "../../../Service/IMMKVStorage";
import { AsyncStorageStatic } from "@react-native-async-storage/async-storage";

export default class SaveListProductsUseCase {
  constructor(private MMKVStorage: IMMKVStorage) {}

  execute = async (key: string, data: string[]): Promise<void> => {
    try {
      this.MMKVStorage.set(key, JSON.stringify(data));
    } catch (error) {
      console.error("SaveListProductsUseCase", error);
    }
  };
}

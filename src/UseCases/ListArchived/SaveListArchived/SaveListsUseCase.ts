import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IList, IListInterface } from "../../../Model/IList";
import { AsyncStorageStatic } from "@react-native-async-storage/async-storage";

export default class SaveListsUseCase {
  constructor(private MMKVStorage: IMMKVStorage) { }

  execute = (key: string, data: string[]): void => {
    try {
      this.MMKVStorage.set(key, JSON.stringify(data));
    } catch (error) {
      console.error("SaveListsUseCase", error);
    }
  };
}

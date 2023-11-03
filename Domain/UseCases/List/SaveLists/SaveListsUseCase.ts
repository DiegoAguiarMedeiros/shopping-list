import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IListInterface } from "../../../Model/IList";
import { AsyncStorageStatic } from "@react-native-async-storage/async-storage";

export default class SaveListsUseCase {
  constructor(private asyncStorage: IMMKVStorage) { }

  execute = async (key: string, data: IListInterface): Promise<void> => {
    try {
      this.asyncStorage.clearAll();
      this.asyncStorage.set(key, JSON.stringify(data));
    } catch (error) {
      console.error("_retrieveData", error);
    }
  };
}

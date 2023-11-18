import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IList, IListInterface } from "../../../Model/IList";
import { AsyncStorageStatic } from "@react-native-async-storage/async-storage";

export default class SaveListsUseCase {
  constructor(private asyncStorage: IMMKVStorage) { }

  execute = async (key: string, data: IListInterface<IList>): Promise<void> => {
    try {
      this.asyncStorage.set(key, JSON.stringify(data));
    } catch (error) {
      console.error("SaveListsUseCase", error);
    }
  };
}

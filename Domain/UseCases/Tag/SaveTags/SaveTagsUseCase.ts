import IMMKVStorage from "../../../Service/IMMKVStorage";
import { ITagInterface } from "../../../Model/ITag";
import { AsyncStorageStatic } from "@react-native-async-storage/async-storage";

export default class SaveITagsUseCase {
  constructor(private asyncStorage: IMMKVStorage) { }

  execute = async (key: string, data: ITagInterface): Promise<void> => {
    try {
      this.asyncStorage.clearAll();
      this.asyncStorage.set(key, JSON.stringify(data));
    } catch (error) {
      console.error("SaveITagsUseCase", error);
    }
  };
}

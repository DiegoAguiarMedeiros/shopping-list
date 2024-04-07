import IMMKVStorage from "../../../Service/IMMKVStorage";
import { AsyncStorageStatic } from "@react-native-async-storage/async-storage";

export default class SaveITagsUseCase {
  constructor(private MMKVStorage: IMMKVStorage) {}

  execute = async (key: string, data: string[]): Promise<void> => {
    try {
      this.MMKVStorage.set(key, JSON.stringify(data));
    } catch (error) {
      console.error("SaveITagsUseCase", error);
    }
  };
}

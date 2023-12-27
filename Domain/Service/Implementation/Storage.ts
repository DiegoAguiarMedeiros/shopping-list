import { AsyncStorageStatic } from "@react-native-async-storage/async-storage";
import IStorage from "../IStorage";

export default class Storage implements IStorage {
  constructor(private MMKVStorage: AsyncStorageStatic) { }

  get = async (key: string): Promise<string | null> => {
    try {
      const data = await this.MMKVStorage.getItem(key);
      return data;
    } catch (error) {
      console.error("_retrieveData", error);
      return null;
    }
  };

  set = (key: string, data: any): void => {
    this.MMKVStorage.setItem(key, JSON.stringify(data));
  };
}

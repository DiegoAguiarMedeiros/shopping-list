import IMMKVStorage from "../../../Service/IMMKVStorage";

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

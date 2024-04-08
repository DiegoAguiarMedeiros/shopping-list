import IMMKVStorage from "../../../Service/IMMKVStorage";

export default class SaveListsUseCase {
  constructor(private MMKVStorage: IMMKVStorage) {}

  execute = (key: string, data: string[]): void => {
    try {
      this.MMKVStorage.set(key, JSON.stringify(data));
    } catch (error) {
      console.error("SaveListsUseCase", error);
    }
  };
}

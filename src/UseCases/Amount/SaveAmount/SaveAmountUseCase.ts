import IMMKVStorage from "../../../Service/IMMKVStorage";

export default class SaveAmountUseCase {
  constructor(private mmkv: IMMKVStorage) {}
  execute = async (key: string, data: string[]): Promise<void> => {
    try {
      this.mmkv.set(key, JSON.stringify(data));
    } catch (error) {
      console.error("SaveListsUseCase", error);
    }
  };
}

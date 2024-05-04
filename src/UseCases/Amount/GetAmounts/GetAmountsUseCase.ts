import IStorage from "../../../Service/IMMKVStorage";

export default class GetAmountsUseCase {
  constructor(private mmkv: IStorage) {}
  execute = (key: string): string[] => {
    try {
      const data = this.mmkv.get(key);
      if (data) {
        const list: string[] = JSON.parse(data);
        return list;
      }
      return [];
    } catch (error) {
      console.error("GetAmountsUseCase", error);
      return [];
    }
  };
}

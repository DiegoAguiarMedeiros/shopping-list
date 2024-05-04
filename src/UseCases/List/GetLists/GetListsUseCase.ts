import IMMKVStorage from "../../../Service/IMMKVStorage";

export default class GetListsUseCase {
  constructor(private mmkv: IMMKVStorage) {}

  execute = (key: string): string[] => {
    try {
      const data = this.mmkv.get(key);
      if (data) {
        const list: string[] = JSON.parse(data);
        return list;
      }
      return [];
    } catch (error) {
      console.error("GetListsUseCase", error);
      return [];
    }
  };
}

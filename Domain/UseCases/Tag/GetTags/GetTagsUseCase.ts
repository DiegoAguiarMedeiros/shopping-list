import IStorage from "../../../Service/IMMKVStorage";
import { IList, IListInterface } from "../../../Model/IList";

export default class GetTagsUseCase {
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
      console.error("GetTagsUseCase", error);
      return [];
    }
  };
}

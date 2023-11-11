import IStorage from "../../../Service/IMMKVStorage";
import { IListInterface } from "../../../Model/IList";

export default class GetTagsUseCase {
  constructor(private mmkv: IStorage) { }

  execute = (key: string): IListInterface | null => {
    try {
      const data = this.mmkv.get(key);
      if (data) {
        const list: IListInterface = JSON.parse(data);
        return list;
      }
      return null;
    } catch (error) {
      console.error("GetTagsUseCase", error);
      return null;
    }
  };
}

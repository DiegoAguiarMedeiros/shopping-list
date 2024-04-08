import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IList, IListInterface } from "../../../Model/IList";

export default class GetListUseCase {
  constructor(private mmkv: IMMKVStorage) {}

  execute = (key: string): IList => {
    try {
      const data = this.mmkv.get(key);
      if (data) {
        const list: IList = JSON.parse(data);
        return list;
      }
      const result: IList = {
        uuid: "",
        name: "",
        tags: [],
        items: [],
      };
      return result;
    } catch (error) {
      console.error("GetListUseCase", error);
      const result: IList = {
        uuid: "",
        name: "",
        tags: [],
        items: [],
      };
      return result;
    }
  };
}

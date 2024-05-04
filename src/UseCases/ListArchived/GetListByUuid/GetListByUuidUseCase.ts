import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IListInterface } from "../../../Model/IList";

export default class GetListUseCase {
  constructor(private mmkv: IMMKVStorage) {}

  execute = (key: string): IListInterface<IList> | null => {
    try {
      const data = this.mmkv.get(key);
      if (data) {
        const list: IListInterface<IList> = JSON.parse(data);
        return list;
      }
      return null;
    } catch (error) {
      console.error("GetListUseCase", error);
      return null;
    }
  };
}

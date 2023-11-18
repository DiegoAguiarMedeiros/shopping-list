import IStorage from "../../../../Domain/Service/IMMKVStorage";
import { IListInterface } from "../../../Model/IList";

export default class GetListsUseCase {
  constructor(private mmkv: IStorage) { }

  execute = (key: string): IListInterface<IList> | null => {
    try {
      const data = this.mmkv.get(key);
      if (data) {
        const list: IListInterface<IList> = JSON.parse(data);
        return list;
      }
      return null;
    } catch (error) {
      console.error("GetListsUseCase", error);
      return null;
    }
  };
}

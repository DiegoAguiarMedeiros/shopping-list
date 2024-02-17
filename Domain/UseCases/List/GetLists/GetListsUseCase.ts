import IMMKVStorage from "../../../../Domain/Service/IMMKVStorage";
import { IList, IListInterface } from "../../../Model/IList";

export default class GetListsUseCase {
  constructor(private mmkv: IMMKVStorage) { }

  execute = (key: string): IListInterface<IList> => {
    try {
      const data = this.mmkv.get(key);
      if (data) {
        const list: IListInterface<IList> = JSON.parse(data);
        return list;
      }
      return {};
    } catch (error) {
      console.error("GetListsUseCase", error);
      return {};
    }
  };
}

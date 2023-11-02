import IStorage from "../../../../Domain/Service/IMMKVStorage";
import { IListInterface } from "../../../Model/IList";

export default class GetListsUseCase {
  constructor(private mmkv: IStorage) {}

  execute = async (key: string): Promise<IListInterface | null> => {
    try {
      const data = await this.mmkv.get(key);
      if (data) {
        const list: IListInterface = JSON.parse(data);
        return list;
      }
      return null;
    } catch (error) {
      console.error("_retrieveData", error);
      return null;
    }
  };
}

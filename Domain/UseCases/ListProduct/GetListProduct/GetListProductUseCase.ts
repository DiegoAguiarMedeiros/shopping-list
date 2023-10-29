import IStorage from "../../../Service/IStorage";
import { IListInterface } from "../../../Model/IList";

export default class GetListProductUseCase {
  constructor(private asyncStorage: IStorage) {}

  execute = async (key: string): Promise<IListInterface | null> => {
    try {
      const data = await this.asyncStorage.retrieveData(key);
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

import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IList, IListInterface } from "../../../Model/IList";

export default class SaveListsUseCase {
  constructor(private MMKVStorage: IMMKVStorage) { }

  execute = (key: string, data: IListInterface<IList>): void => {
    try {
      this.MMKVStorage.set(key, JSON.stringify(data));
    } catch (error) {
      console.error("SaveListsUseCase", error);
    }
  };
}

import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IListInterface } from "../../../Model/IList";
import IController from "../../interface/ISaveListsController";

export default class DeleteListUseCase {
  constructor(private mmkv: IMMKVStorage,
    private saveLists: IController) { }

  execute = (key: string): void => {
    try {
      this.mmkv.delete(key);
      const listsStringOrNull = this.mmkv.get('SLSHOPPINGLIST');
      const lists: IListInterface = listsStringOrNull ? JSON.parse(listsStringOrNull) : listsStringOrNull;
      delete lists[key];
      this.saveLists.handle(lists);
    } catch (error) {
      console.error("_retrieveData", error);
    }
  };
}

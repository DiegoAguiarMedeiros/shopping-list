import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IListInterface } from "../../../Model/IList";
import IController from "../../interface/IController";

export default class DeleteListUseCase {
  constructor(private mmkv: IMMKVStorage,
    private saveLists: IController) { }

  execute = (key: string): void => {
    try {
      this.mmkv.delete(key);
      const listsStringOrNull = this.mmkv.get('SLSHOPPINGLIST');
      if (listsStringOrNull) {
        const lists: IListInterface = listsStringOrNull ? JSON.parse(listsStringOrNull) : listsStringOrNull;
        delete lists[key];
        this.saveLists.handle(lists);
      }
    } catch (error) {
      console.error("DeleteListUseCase", error);
    }
  };
}

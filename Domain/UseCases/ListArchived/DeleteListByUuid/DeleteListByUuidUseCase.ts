import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IList, IListInterface } from "../../../Model/IList";
import { IControllerSaveList } from "../../interface/IController";

export default class DeleteListUseCase {
  constructor(private mmkv: IMMKVStorage,
    private saveLists: IControllerSaveList) { }

  execute = (key: string): void => {
    try {
      this.mmkv.delete(key);
      const listsStringOrNull = this.mmkv.get('SLSHOPPINGLISTARCHIVED');
      if (listsStringOrNull) {
        const lists: IListInterface<IList> = listsStringOrNull ? JSON.parse(listsStringOrNull) : listsStringOrNull;
        delete lists[key];
        this.saveLists.handle(lists);
      }
    } catch (error) {
      console.error("ARCHIVED DeleteListUseCase", error);
    }
  };
}

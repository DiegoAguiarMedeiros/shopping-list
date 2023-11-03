import IMMKVStorage from "../../../../Domain/Service/IMMKVStorage";
import { IList, IListInterface } from "../../../Model/IList";
import IController from "../../interface/ISaveListsController";

export default class SaveListByUuidUseCase {
  constructor(
    private asyncStorage: IMMKVStorage,
    private saveLists: IController,
    private getLists: IController
  ) { }

  execute = (key: string, data: IList): void => {
    try {
      this.asyncStorage.set(key, JSON.stringify(data));
      const listsStringOrNull = this.asyncStorage.get('SLSHOPPINGLIST');
      const lists: IListInterface = listsStringOrNull ? JSON.parse(listsStringOrNull) : listsStringOrNull;
      const newListInterface: IListInterface = {
        ...(lists ? lists : {}),
        [data.uuid]: data,
      };
      this.saveLists.handle(newListInterface);
    } catch (error) {
      console.error("SaveListByUuidUseCase", error);
    }
  };
}

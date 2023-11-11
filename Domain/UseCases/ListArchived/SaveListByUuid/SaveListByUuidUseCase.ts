import IMMKVStorage from "../../../../Domain/Service/IMMKVStorage";
import { IList, IListInterface } from "../../../Model/IList";
import IController from "../../interface/IController";

export default class SaveListByUuidUseCase {
  constructor(
    private mmkv: IMMKVStorage,
    private saveLists: IController,
    private getLists: IController
  ) { }

  execute = (key: string, data: IList): void => {
    try {
      this.mmkv.set(key, JSON.stringify(data));
      const listsStringOrNull = this.mmkv.get('SLSHOPPINGLISTARCHIVED');
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

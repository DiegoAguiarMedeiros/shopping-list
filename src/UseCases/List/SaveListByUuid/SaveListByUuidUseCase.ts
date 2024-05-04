import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IList } from "../../../Model/IList";
import {
  IControllerGetLists,
  IControllerSaveList,
} from "../../interface/IController";

export default class SaveListByUuidUseCase {
  constructor(
    private mmkv: IMMKVStorage,
    private saveLists: IControllerSaveList,
    private getLists: IControllerGetLists
  ) {}

  execute = (key: string, data: IList): void => {
    try {
      this.mmkv.set(key, JSON.stringify(data));
      const lists = this.getLists.handle();
      if (!lists.includes(data.uuid))
        this.saveLists.handle([...lists, data.uuid]);
    } catch (error) {
      console.error("SaveListByUuidUseCase", error);
    }
  };
}

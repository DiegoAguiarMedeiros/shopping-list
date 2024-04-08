import { convertToInterface } from "../../../utils/functions";
import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IList, IListInterface } from "../../../Model/IList";
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
      if (lists) {
        lists.push(data);
        const newListInterface: IListInterface<IList> =
          convertToInterface(lists);
        this.saveLists.handle(newListInterface);
      } else {
        const newListInterface: IListInterface<IList> = {};
        newListInterface[data.uuid] = data;
        this.saveLists.handle(newListInterface);
      }
    } catch (error) {
      console.error("SaveListByUuidUseCase", error);
    }
  };
}

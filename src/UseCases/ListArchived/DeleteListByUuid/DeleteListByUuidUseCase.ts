import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IList, IListInterface } from "../../../Model/IList";
import {
  IControllerDelete,
  IControllerSaveList,
} from "../../interface/IController";

export default class DeleteListUseCase {
  constructor(
    private mmkv: IMMKVStorage,
    private removeList: IControllerDelete
  ) {}

  execute = (key: string): void => {
    try {
      this.mmkv.delete(key);
      this.removeList.handle(key);
    } catch (error) {
      console.error("ARCHIVED DeleteListUseCase", error);
    }
  };
}

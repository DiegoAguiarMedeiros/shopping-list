import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IControllerDelete } from "../../interface/IController";

export default class DeleteListUseCase {
  constructor(
    private mmkv: IMMKVStorage,
    private removeList: IControllerDelete
  ) {}

  execute = (listUuid: string): void => {
    try {
      this.mmkv.delete(listUuid);
      this.removeList.handle(listUuid);
    } catch (error) {
      console.error("DeleteListUseCase", error);
    }
  };
}

import {
  IControllerSaveList,
  IControllerGetLists,
} from "../../interface/IController";

export default class RemoveListByUuidUseCase {
  constructor(
    private getLists: IControllerGetLists,
    private saveLists: IControllerSaveList
  ) {}
  execute(listUuid: string) {
    try {
      const lists = this.getLists.handle();
      const listFiltered = lists.filter((list) => list !== listUuid);
      this.saveLists.handle(listFiltered);
    } catch (err) {
      console.error("RemoveListByUuidUseCase: ", err);
    }
  }
}

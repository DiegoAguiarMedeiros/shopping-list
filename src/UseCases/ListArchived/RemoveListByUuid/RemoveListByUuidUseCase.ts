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
    const lists = this.getLists.handle();
    const listFiltered = lists.filter((list) => list !== listUuid);
    this.saveLists.handle(listFiltered);
  }
}

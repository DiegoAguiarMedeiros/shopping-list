import { IList, IListInterface } from "../../../Model/IList";
import { IControllerGetLists } from "../../interface/IController";
import GetListsUseCase from "./GetListsUseCase";

export default class GetListsController implements IControllerGetLists {
  constructor(private getListsUseCase: GetListsUseCase) {}

  handle = (): string[] => {
    try {
      return this.getListsUseCase.execute("SLSHOPPINGLIST");
    } catch (err) {
      console.error("GetListsController: ", err);
      return [];
    }
  };
}

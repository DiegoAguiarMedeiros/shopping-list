import { sortArrayOfObjects } from "../../../utils/functions";
import { IList, IListInterface } from "../../../Model/IList";
import GetListsUseCase from "./GetListsUseCase";
import { IControllerGetLists } from "../../interface/IController";

export default class GetListsController implements IControllerGetLists {
  constructor(private getListsUseCase: GetListsUseCase) {}
  handle = (): string[] => {
    try {
      return this.getListsUseCase.execute("SLSHOPPINGLISTARCHIVED");
    } catch (err) {
      console.error("GetListsController: ", err);
      return [];
    }
  };
}

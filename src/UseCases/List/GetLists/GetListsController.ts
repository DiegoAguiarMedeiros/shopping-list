import { IList, IListInterface } from "../../../Model/IList";
import { IControllerGetLists } from "../../interface/IController";
import GetListsUseCase from "./GetListsUseCase";

export default class GetListsController implements IControllerGetLists {
  constructor(private getListsUseCase: GetListsUseCase) { }

  handle = (): IList[] => {
    try {
      const result = this.getListsUseCase.execute("SLSHOPPINGLIST");
      let data: IList[];
      result ? (data = Object.values(result)) : (data = []);
      return data;
    } catch (err) {
      console.error("GetListsController: ", err);
      return [];
    }
  };
}

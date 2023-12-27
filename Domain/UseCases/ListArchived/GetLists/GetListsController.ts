import { IList, IListInterface } from "../../../Model/IList";
import GetListsUseCase from "./GetListsUseCase";

export default class GetListsController {
  constructor(private getListsUseCase: GetListsUseCase) { }

  handle = (): IList[] => {
    try {
      const result = this.getListsUseCase.execute("SLSHOPPINGLISTARCHIVED");
      let data: IList[];
      result ? (data = Object.values(result)) : (data = []);
      return data;
    } catch (err) {
      console.error("GetListsController: ", err);
      return [];
    }
  };
}

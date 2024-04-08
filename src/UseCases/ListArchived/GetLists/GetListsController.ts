import { sortArrayOfObjects } from "../../../utils/functions";
import { IList, IListInterface } from "../../../Model/IList";
import GetListsUseCase from "./GetListsUseCase";

export default class GetListsController {
  constructor(private getListsUseCase: GetListsUseCase) {}

  handle = (): IList[] => {
    try {
      const result = this.getListsUseCase.execute("SLSHOPPINGLISTARCHIVED");
      let data: IList[] = sortArrayOfObjects(Object.values(result), "name");
      return result ? data : [];
    } catch (err) {
      console.error("GetListsController: ", err);
      return [];
    }
  };
}

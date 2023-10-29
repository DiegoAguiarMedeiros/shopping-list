import IList, { IListInterface } from "../../../Model/IList";
import GetListsUseCase from "./GetListsUseCase";

export default class GetListsController {
  constructor(private getListsUseCase: GetListsUseCase) {}

  handle = async (): Promise<IList[] | null> => {
    try {
      const result = await this.getListsUseCase.execute("SLSHOPPINGLIST");
      let data: IList[] | null;
      result ? (data = Object.values(result)) : (data = null);
      return data;
    } catch (err) {
      console.error("GetListsController: ", err);
      return null;
    }
  };
}

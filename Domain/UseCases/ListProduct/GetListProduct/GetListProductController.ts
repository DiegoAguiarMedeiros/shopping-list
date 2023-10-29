import IList, { IListInterface } from "../../../Model/IList";
import GetListProductUseCase from "./GetListProductUseCase";

export default class GetListProductController {
  constructor(private GetListProductUseCase: GetListProductUseCase) {}

  handle = async (productsUuid: string[]): Promise<IList[] | null> => {
    try {
      const result = await this.GetListProductUseCase.execute("SLSHOPPINGLIST");
      let data: IList[] | null;
      result ? (data = Object.values(result)) : (data = null);
      return data;
    } catch (err) {
      console.error("GetListProductController: ", err);
      return null;
    }
  };
}

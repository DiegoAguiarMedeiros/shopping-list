import { IProduct } from "../../../Model/IProduct";
import { IList, IListInterface } from "../../../Model/IList";
import { IControllerGetListProducts } from "../../interface/IController";
import GetListsUseCase from "./GetListProductsUseCase";

export default class GetListProductsController implements IControllerGetListProducts {
  constructor(private getListsUseCase: GetListsUseCase) { }

  handle = (): IProduct[] | null => {
    try {
      const result = this.getListsUseCase.execute("SLSHOPPINGLISTPRODUCT");
      let data: IProduct[] | null;
      result ? (data = Object.values(result)) : (data = null);
      return data;
    } catch (err) {
      console.error("GetListProductsController: ", err);
      return null;
    }
  };
}

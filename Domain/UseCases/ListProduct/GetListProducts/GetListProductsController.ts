import { IProduct } from "../../../Model/IProduct";
import { IControllerGetListProducts } from "../../interface/IController";
import GetListsUseCase from "./GetListProductsUseCase";

export default class GetListProductsController implements IControllerGetListProducts {
  constructor(private getListsUseCase: GetListsUseCase) { }

  handle = (): IProduct[] => {
    try {
      const result = this.getListsUseCase.execute("SLSHOPPINGLISTPRODUCT");
      let data: IProduct[];
      result ? (data = Object.values(result)) : (data = []);
      return data;
    } catch (err) {
      console.error("GetListProductsController: ", err);

      return [];
    }
  };
}

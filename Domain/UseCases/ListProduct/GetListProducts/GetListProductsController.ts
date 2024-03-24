import { sortArrayOfObjects } from "../../../../utils/functions";
import { IProduct } from "../../../Model/IProduct";
import { IControllerGetListProducts } from "../../interface/IController";
import GetListProductsUseCase from "./GetListProductsUseCase";

export default class GetListProductsController
  implements IControllerGetListProducts
{
  constructor(private getListProductsUseCase: GetListProductsUseCase) {}

  handle = (): string[] => {
    try {
      return this.getListProductsUseCase.execute("SLSHOPPINGLISTPRODUCT");
    } catch (err) {
      console.error("GetListProductsController: ", err);
      return [];
    }
  };
}

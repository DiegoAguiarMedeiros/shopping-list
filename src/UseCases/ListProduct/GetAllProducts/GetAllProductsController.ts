import { sortArrayOfObjects } from "../../../../utils/functions";
import { IProduct } from "../../../Model/IProduct";
import { IControllerGetAllProducts } from "../../interface/IController";
import GetAllProductsUseCase from "./GetAllProductsUseCase";

export default class GetAllProductsController
  implements IControllerGetAllProducts
{
  constructor(private getAllProductsUseCase: GetAllProductsUseCase) {}

  handle = (): string[] => {
    try {
      return this.getAllProductsUseCase.execute("SLSHOPPINGLISTPRODUCT");
    } catch (err) {
      console.error("GetAllProductsController: ", err);
      return [];
    }
  };
}

import { sortArrayOfObjects } from "../../../../utils/functions";
import { IProduct } from "../../../Model/IProduct";
import { IControllerGetProductsByUuid } from "../../interface/IController";
import GetProductUseCase from "./GetProductByUuidUseCase";

export default class GetProductController
  implements IControllerGetProductsByUuid
{
  constructor(private GetProductUseCase: GetProductUseCase) {}

  handle = (productsUuid: string): IProduct | null => {
    try {
      return this.GetProductUseCase.execute(productsUuid);
    } catch (err) {
      console.error("GetProductController: ", err);
      const result: IProduct[] = [];
      return null;
    }
  };
}

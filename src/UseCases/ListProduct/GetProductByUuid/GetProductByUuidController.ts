import { sortArrayOfObjects } from "../../../utils/functions";
import { IProduct } from "../../../Model/IProduct";
import { IControllerGetProductsByUuid } from "../../interface/IController";
import GetProductByUuidUseCase from "./GetProductByUuidUseCase";

export default class GetProductByUuidController implements IControllerGetProductsByUuid {
  constructor(private GetProductByUuidUseCase: GetProductByUuidUseCase) {}

  handle = (productsUuid: string): IProduct | null => {
    try {
      return this.GetProductByUuidUseCase.execute(productsUuid);
    } catch (err) {
      console.error("GetProductController: ", err);
      return null;
    }
  };
}

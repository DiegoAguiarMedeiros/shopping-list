import { IProduct } from "../../../Model/IProduct";
import { IControllerGetListProductsByUuid } from "../../interface/IController";
import GetListProductsByUuidUseCase from "./GetListProductsByUuidUseCase";

export default class GetListProductsByUuidController
  implements IControllerGetListProductsByUuid
{
  constructor(
    private GetListProductsByUuidUseCase: GetListProductsByUuidUseCase
  ) {}
  handle(productsUuid: string[]): IProduct[] {
    return this.GetListProductsByUuidUseCase.execute(productsUuid);
  }
}

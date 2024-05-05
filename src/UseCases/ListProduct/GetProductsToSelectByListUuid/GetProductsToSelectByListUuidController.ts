import { IProduct } from "../../../Model/IProduct";
import GetProductsToSelectByListUuidUseCase from "./GetProductsToSelectByListUuidUseCase";

export default class GetProductsToSelectByListUuidController {
  constructor(
    private getProductsToSelectByListUuidUseCase: GetProductsToSelectByListUuidUseCase
  ) {}
  handle(listUuid: string): IProduct[] {
    return this.getProductsToSelectByListUuidUseCase.execute(listUuid);
  }
}

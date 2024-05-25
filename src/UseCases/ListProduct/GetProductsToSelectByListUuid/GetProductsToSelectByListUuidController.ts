import { ITagsProductsMultiSelect } from "../../../Model/IProduct";
import GetProductsToSelectByListUuidUseCase from "./GetProductsToSelectByListUuidUseCase";

export default class GetProductsToSelectByListUuidController {
  constructor(
    private getProductsToSelectByListUuidUseCase: GetProductsToSelectByListUuidUseCase
  ) {}
  handle(listUuid: string): ITagsProductsMultiSelect[] {
    return this.getProductsToSelectByListUuidUseCase.execute(listUuid);
  }
}

import { IProductTiny } from "../../../Model/IProduct";
import GetListProductsTinyByTagUuidUseCase from "./GetListProductsTinyByTagUuidUseCase";

export default class GetListProductsByTagUuidController {
  constructor(
    private GetListProductsTinyByTagUuidUseCase: GetListProductsTinyByTagUuidUseCase
  ) {}
  handle(tagUuid: string): IProductTiny[] {
    return this.GetListProductsTinyByTagUuidUseCase.execute(tagUuid);
  }
}

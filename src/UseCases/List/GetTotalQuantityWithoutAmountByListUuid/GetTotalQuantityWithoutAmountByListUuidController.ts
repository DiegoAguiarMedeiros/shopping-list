import { IProduct } from "../../../Model/IProduct";
import GetTotalQuantityWithoutAmountByListUuidUseCase from "./GetTotalQuantityWithoutAmountByListUuidUseCase";

export default class GetQuantityWithoutAmountByListUuidController {
  constructor(
    private getTotalQuantityWithoutAmountByListUuidUseCase: GetTotalQuantityWithoutAmountByListUuidUseCase
  ) {}
  handle(listUuid: string, filter: string = "Todos"): number {
    return this.getTotalQuantityWithoutAmountByListUuidUseCase.execute(
      listUuid,
      filter
    );
  }
}
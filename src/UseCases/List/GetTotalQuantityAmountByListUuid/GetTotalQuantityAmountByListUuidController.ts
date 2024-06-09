import { IProduct } from "../../../Model/IProduct";
import GetTotalQuantityAmountByListUuidUseCase from "./GetTotalQuantityAmountByListUuidUseCase";

export default class GetQuantityAmountByListUuidController {
  constructor(
    private getTotalQuantityAmountByListUuidUseCase: GetTotalQuantityAmountByListUuidUseCase
  ) {}
  handle(listUuid: string, filter: string = "Todos"): number {
    return this.getTotalQuantityAmountByListUuidUseCase.execute(
      listUuid,
      filter
    );
  }
}
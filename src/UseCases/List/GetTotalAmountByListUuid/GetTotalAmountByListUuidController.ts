import { IProduct } from "../../../Model/IProduct";
import GetAmountByListUuidUseCase from "./GetTotalAmountByListUuidUseCase";

export default class GetAmountByListUuidController {
  constructor(private getAmountByListUuidUseCase: GetAmountByListUuidUseCase) {}

  handle(listUuid: string, filter: string = "Todos"): number {
    return this.getAmountByListUuidUseCase.execute(listUuid, filter);
  }
}
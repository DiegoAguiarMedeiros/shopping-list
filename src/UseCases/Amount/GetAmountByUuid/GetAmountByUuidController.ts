import IAmount from "../../../Model/IAmount";
import GetAmountByUuidUseCase from "./GetAmountByUuidUseCase";

export default class GetAmountByUuidController {
  constructor(private getAmountByUuidUseCase: GetAmountByUuidUseCase) {}
  handle(key: string): IAmount {
    return this.getAmountByUuidUseCase.execute(key);
  }
}

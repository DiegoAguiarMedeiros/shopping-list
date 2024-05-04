import IAmount from "../../../Model/IAmount";
import { IControllerGetAmountsObject } from "../../interface/IController";

export default class GetAmountByListProductUuidUseCase {
  constructor(private getAmount: IControllerGetAmountsObject) {}
  execute(key: string): IAmount[] {
    const amounts = this.getAmount.handle();
    return amounts.filter((amount) => amount.listProductUuid === key);
  }
}
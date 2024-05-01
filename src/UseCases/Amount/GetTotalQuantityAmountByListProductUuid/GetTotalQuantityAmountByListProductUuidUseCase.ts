import { IControllerGetAmountsObject } from "../../interface/IController";

export default class GetTotalQuantityAmountByListProductUuidUseCase {
  constructor(private getAmount: IControllerGetAmountsObject) {}
  execute(key: string): number {
    const amounts = this.getAmount
      .handle()
      .filter((amount) => amount.listProductUuid === key);
    const total: { total: number } = { total: 0 };
    if (amounts.length > 0) {
      amounts.forEach((amount) => {
        total.total = amount?.type
          ? total.total + 1
          : total.total + Number(amount?.quantity);
      });
    } else {
      total.total = 0;
    }

    return total.total;
  }
}

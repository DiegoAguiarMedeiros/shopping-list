import { IControllerGetAmounts } from "../../interface/IController";

export default class GetTotalAmountByListProductUuidUseCase {
    constructor(private getAmount: IControllerGetAmounts) { }
    execute(key: string): number {

        const amounts = this.getAmount.handle().filter(amount => amount.listProductUuid === key);
        let total: number = 0;
        amounts.forEach((amount) => {
            total = total + Number(amount?.amount) * Number(amount?.quantity);
        });
        return total;

    }
}
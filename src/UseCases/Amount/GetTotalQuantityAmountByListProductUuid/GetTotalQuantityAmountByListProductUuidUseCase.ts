import { IControllerGetAmounts } from "../../interface/IController";

export default class GetTotalQuantityAmountByListProductUuidUseCase {
    constructor(private getAmount: IControllerGetAmounts) { }
    execute(key: string): number {

        const amounts = this.getAmount.handle().filter(amount => amount.listProductUuid === key);;

        let total: number = 0;
        amounts.length > 0 ?
            amounts.forEach((amount) => {
                total = amount?.type ? total + 1 : total + Number(amount?.quantity);
            })
            :
            total = 1;
        ;
        return total;

    }
}
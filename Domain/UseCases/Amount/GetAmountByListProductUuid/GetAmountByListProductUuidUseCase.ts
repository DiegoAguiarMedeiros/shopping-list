import IAmount from "../../../Model/IAmount";
import { IControllerGetAmounts } from "../../interface/IController";

export default class GetAmountByListProductUuidUseCase {
    constructor(private getAmount: IControllerGetAmounts) { }
    execute(key: string): IAmount[] {

        const amounts = this.getAmount.handle();
        return amounts;
    }
}
import IAmount from "../../../Model/IAmount";
import { IListInterface } from "../../../Model/IList";
import SaveAmountUseCase from "./SaveAmountUseCase";

export default class SaveAmountController {
    constructor(private saveAmountUseCase: SaveAmountUseCase) { }
    handle = (data: IListInterface<IAmount>): void => {
        try {
            this.saveAmountUseCase.execute('SLSHOPPINGAMOUNT', data);
        } catch (err) {
            console.error("SaveAmountController: ", err);
        }
    };
}